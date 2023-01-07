import playwright from 'playwright';
import { delay } from '../utils/helpers.js';
import Colors from 'colors.ts';
import { setFavMatches } from '../scrape/setFavMatches.js';
import { matchExists } from '../scrape/scrapeController.js';

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

  let matchIds = [];
  const eventHeader = page.locator("xpath=//div[contains(@class, 'event__header')] ");

  // Set my matches to favourites
  await setFavMatches(eventHeader);

  console.log('Collecting match ids...'.green.bold);

  // Loop through sportDivs and get ids from favourites
  let star_class;
  for (let i = 0; i < SNDivsCount; i++) {
    let matchId = await sportNameDivs.nth(i).getAttribute('id');
    const eventScore = sportNameDivs.nth(i).locator('div[class="event__score event__score--home"]');

    const starCount = await sportNameDivs.nth(i).locator('div').nth(0).locator('span').locator('svg').count();

    if (starCount > 0) {
      star_class = await sportNameDivs.nth(i).locator('div').nth(0).locator('span').locator('svg').getAttribute('class');
      const country = await sportNameDivs.nth(i).locator('.event__title--type').innerText();
      const league = await sportNameDivs.nth(i).locator('.event__title--name').innerText();
      const competition = `${country} - ${league}`;
      console.log(`\nSetting Match IDs for competition: ${competition}`.green.bold);
    }

    if (star_class === 'star-ico eventStar eventStar--active' && matchId && ((await eventScore.count()) == 0 || (await eventScore.innerText()) === '-')) {
      // Removing first 4 characters from the id string
      matchId = matchId.substring(4);

      // Check if matchId exists in database
      if (await matchExists(matchId)) {
        console.log(`Match ${matchId} exists in the database, skipping...`.bg_red);
      } else {
        const homeTeam = await sportNameDivs.nth(i).locator('.event__participant--home').innerText();
        const awayTeam = await sportNameDivs.nth(i).locator('.event__participant--away').innerText();
        console.log(`${homeTeam} vs ${awayTeam} (ID: ${matchId})`);
        matchIds.push(matchId);
      }
    } else if (star_class === 'star-ico eventStar ') {
      break;
    }
  }
  browser.close();
  // return matchIds;
};
