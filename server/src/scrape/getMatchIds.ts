import playwright from 'playwright';
import { delay } from '../utils/helpers.js';
import Colors from 'colors.ts';
import { setFavMatches } from '../scrape/setFavMatches.js';

Colors.enable();

export const getMatchIds = async (day: string) => {
  const browser = await playwright.chromium.launch({
    headless: false // setting this to true will not run the UI
  });

  const page = await browser.newPage();
  await page.goto('https://www.flashscore.com');

  if (day === 'nextDay') {
    await page.locator('#live-table').locator('div').nth(0).locator('div[title="Next day"]').click();
  }

  const sportNameDivs = page.locator('.sportName').locator('div');
  const SNDivsCount = await sportNameDivs.count();
  delay(5000);

  // let matchIds = [];
  const eventHeader = page.locator("xpath=//div[contains(@class, 'event__header')] ");

  // Set my matches to favourites
  await setFavMatches(eventHeader);

  browser.close();
  // return matchIds;
};
