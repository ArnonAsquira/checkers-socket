import * as puppeteer from "puppeteer";
import { Location } from "../types/boardTypes";

const baseUrl = "http://localhost:3000/";

const movesArray: Location[] = [
  [2, 5],
  [3, 6],
  [5, 6],
  [4, 5],
];

const testPlaying = async (movesArray: Location[]) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 5 });
  const page = await browser.newPage();
  await page.goto(baseUrl);
  for (const location of movesArray) {
    await page.click(`[id="${location[0]}-${location[1]}"]`);
  }
  // await browser.close();
};

testPlaying(movesArray);
