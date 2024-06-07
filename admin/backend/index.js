const express = require("express");
const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");
const axios = require("axios").default;

const db = require("./db");
const https = require("https");

axios.maxRedirects = 0;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const TestProgram = require("./db/models/testProgram");

const default_site_url = "https://affilisting.com";
const page_next_url = "/list?page=";
// const block_resource_type = new Set(["image", "stylesheet", "font", "ping"]);
let total_affiliates = 0;
let datas = [];
let tags = [];
let platforms = [];
let langs = [];
let programItem = {};
let link = {};
const app = express();

db.connect(app);

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(8001, async () => {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: "new",
      executablePath: executablePath(),
    });

    const page = await browser.newPage();
    page.setRequestInterception(true);

    page.on("request", (req) => {
      req.continue();
    });

    page.on("response", async (res) => {
      const url = res.url();
      if (url == "https://affilisting.com/list") {
        try {
          const courses = JSON.parse(await res.text());
          tags = courses.props.tags;
          platforms = courses.props.platforms;
          datas = courses.props.affiliates.data;
          langs = courses.props.langs;
          total_affiliates = courses.props.total_affiliates;
        } catch (error) {
          console.error(`Failed to parse response text due to ${error}`);
        }
      }
      if (url.includes(page_next_url) > 0) {
        try {
          console.log(url);
          datas = [];
          const courses = JSON.parse(await res.text());
          datas = courses.props.affiliates.data;
        } catch (error) {
          console.error(`Failed to parse response text due to ${error}`);
        }
      }
    });

    await page.goto("https://affilisting.com/login", { timeout: 0 });
    await page.type("#email", "halikmalma@gmail.com");
    await page.type("#password", "Sertu$12");
    await Promise.all([
      page.waitForNavigation(),
      page.click("button[type='submit']"),
    ]);
    await page.waitForSelector("table", { timeout: 0 });

    const cookies = await page.cookies();

    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    processPage(page, cookieString);
  } catch (error) {
    console.log(error);
  }
});

async function processPage(page, cookieString) {
  try {
    const [button] = await page.$x("//button[contains(., 'Next')]");

    if (!button) {
      console.log("No more 'Next' button, ending process");
      return;
    }
    if (datas.length > 0) {
      for (let i = 0; i < datas.length; i++) {
        const startTime = Date.now();

        const urls = [
          {
            key: "Website",
            url: `${default_site_url}/redirect/${datas.at(i).uuid}/website`,
          },
          {
            key: "Infos",
            url: `${default_site_url}/redirect/${datas.at(i).uuid}/infos`,
          },
          {
            key: "Apply",
            url: `${default_site_url}/redirect/${datas.at(i).uuid}/apply`,
          },
        ];
        for (let j = 0; j < urls.length; j++) {
          try {
            const response = await makeRequest(urls[j].url, cookieString);
            link[urls[j].key] = response.request.res.responseUrl;
          } catch (error) {
            link[urls[j].key] = handleAxiosError(error);
          }
        }

        const saveData = new TestProgram({
          uuid: datas.at(i).uuid,
          name: datas.at(i).name,
          contact_email: datas.at(i).contact_email,
          commission_in_percentage: datas.at(i).commission_in_percentage,
          commission_in_percentage_formatted:
            datas.at(i).commission_in_percentage_formatted,
          commission_amount: datas.at(i).commission_amount,
          commission_amount_formatted: datas.at(i).commission_amount_formatted,
          duration: datas.at(i).duration,
          cash_limit: datas.at(i).cash_limit,
          cash_limit_per_referal: datas.at(i).cash_limit_per_referal,
          promoted: datas.at(i).promoted,
          is_international: datas.at(i).is_international,
          commission_type: datas.at(i).commission_type,
          product_type: datas.at(i).product_type,
          platform: datas.at(i).platform,
          tags: datas.at(i).tags,
          langs: datas.at(i).langs,
          current_user_apply: datas.at(i).current_user_apply,
          current_favorite_user: datas.at(i).current_favorite_user,
          average_ratings: datas.at(i).average_ratings,
          current_user_review: datas.at(i).current_user_review,
          link_data: link,
        });

        saveData
          .save()
          .then(() => {
            console.log("Saving the data...", Date.now() - startTime + "ms");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      console.log("finish------------->");
      console.log("Experiment completed");
    }
    if (button) {
      await button.click();
      await page.waitForNavigation({ timeout: 0 });
      processPage(page, cookieString); // Call the function again to process the next page
    }
  } catch (error) {
    console.log(error);
  }
}

async function makeRequest(url, cookieString) {
  return await axios.get(url, {
    headers: {
      Cookie: cookieString,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    httpsAgent: agent,
  });
}

function handleAxiosError(error) {
  let errorMsg;
  console.log("%%%%%%%%%%%%%%", error.code);
  if (error.code === "ERR_BAD_RESPONSE" || error.code === "ERR_BAD_REQUEST") {
    errorMsg = error.request.res.responseUrl;
  } else if (
    error.code === "ETIMEDOUT" ||
    error.code === "ENOTFOUND" ||
    error.code === "ECONNRESET" ||
    error.code === "ERR_FR_TOO_MANY_REDIRECTS" ||
    error.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
    error.code === "ERR_TLS_CERT_ALTNAME_INVALID"
  ) {
    errorMsg = error.request._options.href;
  } else {
    console.log(error);
    errorMsg = "";
  }
  return errorMsg;
}
