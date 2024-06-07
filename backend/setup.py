import time
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from pymongo import MongoClient 
import pandas as pd

conn = MongoClient('localhost', 27017)
conn = MongoClient()
db = conn.mydb
collections = db.programlists

options = webdriver.ChromeOptions()
options.add_argument("--window-size=1980,1020")
options.add_argument("--headless")
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")
driver = webdriver.Chrome(options=options)

driver.get("https://affilisting.com/login")

wait = WebDriverWait(driver, 10)
username = wait.until(EC.presence_of_element_located((By.ID, 'email')))
password = wait.until(EC.presence_of_element_located((By.ID, 'password')))

username.send_keys("marshallalcorn564@gmail.com")
password.send_keys("Sertu$12")

submit_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
submit_button.click()

wait.until(EC.presence_of_element_located((By.TAG_NAME, 'table')))

data = []
info = {}

for page_num in range(1, 322):
    url = f"https://affilisting.com/list?page={page_num}"
    driver.get(url)
    wait = WebDriverWait(driver, 10)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    table = soup.find('table')
    rows = table.find_all('tr') 
    for i in range(1, len(rows)):
        while True:
            try:
                tr_elements = driver.find_elements(By.TAG_NAME, "tr")
                driver.execute_script("arguments[0].click();", tr_elements[i])
                time.sleep(3) 
                soup = BeautifulSoup(driver.page_source, 'html.parser')
                data_divs = soup.find('dl', attrs={'class': 'mt-2 divide-y divide-gray-200 border-t border-b border-gray-200'})
                if data_divs:          
                    for data_div in data_divs:
                        key = data_div.find('dt').text
                        value = data_div.find('dd').text
                        value_div = data_div.find('dd')
                        if value_div.find_all('span'):
                            spans = value_div.find_all('span')
                            value = ' '.join([span.text for span in spans])
                        else:
                            value = value_div.text                           
                        if key in ['Product Type', 'Geolocation', 'Contact Email', 'Cash Limit', 'Cash Limit (Per Referral)']:                        
                            info[key] = value                    
                else:
                    print("No data divs found")                
                other_divs = soup.find('div', attrs={'class': 'mt-4 mb-4'})
                review_item = {}
                review_data = []
                for div in other_divs:
                    key_element = div.find('div', class_='font-small text-sm text-gray-900')
                    if key_element:                        
                        review_value = div.find('p', class_="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400").text
                        review_item['type'] = key_element.text
                        review_item['content'] = review_value
                        review_data.append(review_item)
                        review_item = {}                          
                activity_divs = soup.find('ul', attrs={'class': 'mt-6 space-y-6'})
                activity_data = []
                activity_item = {}
                for div in activity_divs:
                    activity_value = div.find('span', class_="font-medium text-gray-900").text
                    activity_date = div.find('div', class_="flex-none py-0.5 text-xs leading-5 text-gray-500").text
                    activity_item['activePerson'] = activity_value
                    activity_item['activityDate'] = activity_date                    
                    activity_data.append(activity_item)
                    activity_item = {}
                message = {}
                link_data = []
                link = {}
                message_div = soup.find('div', attrs={'class': 'text-xs mt-2 text-green-600'})
                if message_div is not None:
                    message_text = message_div.text
                    message['activeMessage'] = message_text
                else:
                    print("No div with the specified class found.")
                website_links = soup.find('div', attrs={'class': 'flex space-x-2 items-center'})
                a_tags = website_links.find_all('a')
                for tag in a_tags:       
                    driver.get(tag.get('href')) 
                    if tag.text!="Apply":                        
                        link[tag.text.split(' ')[1]] = driver.current_url
                    else:
                        link[tag.text] = driver.current_url
                    driver.back()
                link_data.append(link)
                link = {}        
                driver.back()
                time.sleep(5)
                break
            except IndexError:
                continue
        tds = rows[i].find_all('td')
        if tds:
            divs = tds[0].find_all('div')
            name = divs[0].text if divs else None
            platform = divs[1].text.split(': ')[1] if len(divs) > 1 else None
            commission_type = divs[2].text.split(': ')[1] if len(divs) > 2 else None
            if divs[3]:
                rates = divs[3].text.split(' ')[0]            
            div_flex = tds[0].find('div', {'class': 'flex space-x-1'}).find_all('div') if tds[0] else None            
            categories = [{'text': div.find('span').text, 'color': div.get('style').split(':')[1].strip(';')} for div in div_flex] if div_flex else None            
            percentage_per_sale = tds[1].text if len(tds) > 1 else None
            amount_per_sale = tds[2].text if len(tds) > 2 else None
            days = tds[3].text if len(tds) > 3 else None

            insert_data = {
                "name": name,
                "platform": platform,
                "commission_type": commission_type,
                "categories": categories,
                "rates": rates,
                "percentage_per_sale": percentage_per_sale,
                "amount_per_sale": amount_per_sale,
                "days": days,
                "activeData": activity_data,
                "reviewData": review_data,
                "linkData": link_data
            }
            data3 = {**insert_data, **info}
            data3 = {key.replace(" ", "_"): value for key, value in data3.items()}
            data3 = {key.replace("(", ""): value for key, value in data3.items()}
            data3 = {key.replace(")", ""): value for key, value in data3.items()}
            data4 = {**data3, **message}

            rec_id1 = collections.insert_one(data3)
driver.quit()