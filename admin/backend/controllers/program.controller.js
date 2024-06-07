const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const TestProgram = require("../db/models/testProgram");
const { StatusCodes } = require("http-status-codes");
const Niches = require("../db/models/niches");
const Platforms = require("../db/models/platforms");
const Geolocations = require("../db/models/geolocation");
const Settings = require("../db/models/settings");
const schedule = require("node-schedule");
const { executablePath } = require("puppeteer");
const axios = require("axios").default;
const https = require("https");

let job;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const default_site_url = "https://affilisting.com";
const page_next_url = "/list?page=";
let datas = [];
let link = {};
let categories = [];
let tags = [];
let platforms = [];
let langs = [];

async function processPage(page, cookieString) {
  try {
    const [button] = await page.$x("//button[contains(., 'Next')]");
    const html = await page.content();
    const $ = cheerio.load(html);

    for (let i = 0; i < datas.length; i++) {
      const startTime = Date.now();

      const tds = $("tr")
        .eq(i + 1)
        .find("td");
      if (tds.length) {
        const div_flex = $(tds[0]).find(".flex.space-x-1 div");
        categories = div_flex
          .map((i, el) => {
            let style = $(el).attr("style");
            if (style) {
              return {
                color: style.split(":")[1].replace(";", ""),
              };
            }
          })
          .get();
      }

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

      if (datas.at(i).uuid !== undefined) {
        let tags = datas.at(i).tags.map((item, index) => {
          return {
            ...item,
            color: categories[index] ? categories[index].color : undefined,
          };
        });
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
          tags: tags,
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
      } else {
        console.error("Undefined data, not saving...");
      }
    }

    console.log("finish------------->");
    console.log("Experiment completed");

    if (button) {
      await button.click();
      await page.waitForNavigation({ timeout: 0 });
      processPage(page, cookieString); // Call the function again to process the next page
    } else {
      if (!button) {
        console.log("No more 'Next' button, ending process");
        return;
      }
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
    maxRedirects: 1,
  });
}

function handleAxiosError(error) {
  let errorMsg;
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

const scrapData = async () => {
  try {
    await TestProgram.deleteMany({});
    console.log("Collection removed");
    let email = "";
    let password = "";
    await Settings.find().then((result) => {
      email = result[0].email;
      password = result[0].password;
    });
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
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
          allTags = courses.props.tags;
          allPlatforms = courses.props.platforms;
          datas = courses.props.affiliates.data;
          allLangs = courses.props.langs;
          total_affiliates = courses.props.total_affiliates;
          tags.map((tag, index) => {
            const saveTag = new Niches({
              id: tag.id,
              slug: tag.slug,
              name: tag.name,
            });
            saveTag.save();
          });

          platforms.map((platform, index) => {
            const savePlatform = new Platforms({
              id: platform.id,
              name: platform.name,
              url: platform.url,
            });
            savePlatform.save();
          });

          langs.map((lang, index) => {
            const saveLang = new Geolocations({
              id: lang.id,
              country_code: lang.country_code,
            });
            saveLang.save();
          });
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
          console.log(datas.length);
        } catch (error) {
          console.error(`Failed to parse response text due to ${error}`);
        }
      }
    });

    await page.goto("https://affilisting.com/login", { timeout: 0 });
    await page.type("#email", `${email}`);
    await page.type("#password", `${password}`);
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
};

const getPromotedList = async (req, res, next) => {
  try {
    await TestProgram.find({ promoted: 1 }).then((programs) => {
      if (programs.length != 0) {
        res.status(StatusCodes.OK).json({
          programs,
        });
      } else {
        res.status(StatusCodes.OK).json({
          message: "No Programs",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    await TestProgram.find().then((programs) => {
      if (programs.length != 0) {
        res.status(StatusCodes.OK).json({
          programs,
        });
      } else {
        res.status(StatusCodes.OK).json({
          message: "No Programs",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

const doSchedule = (req, res, next) => {
  if (job) {
    job.cancel();
  }
  switch (req.body.data) {
    case "every week":
      {
        job = schedule.scheduleJob("0 0 * * 6", function () {
          scrapData();
        });
      }
      break;
    case "every month":
      {
        job = schedule.scheduleJob("0 0 1 * *", function () {
          scrapData();
        });
      }
      break;
    case "now":
      {
        scrapData();
      }
      break;
  }
};

module.exports = {
  getList,
  doSchedule,
  getPromotedList,
};
