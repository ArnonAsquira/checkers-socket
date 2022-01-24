import puppeteer from "puppeteer";

const baseUrl = "http://localhost:3000/";

const testPlaying = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl);
  await browser.close();
};
