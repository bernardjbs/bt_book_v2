import playwright from 'playwright';
import { delay } from '../utils/helpers.js';
import { myLeagues } from '../scrape/myLeagues.js';

export const setFavMatches = async (eventHeader: playwright.Locator) => {
  console.log('Selecting Competitions to scrape...'.green.bold);
  await delay(1000);
  const eventHeader_count = await eventHeader.count();

  for (let i = 0; i < eventHeader_count; i++) {
    let star;

    star = eventHeader.nth(i).locator('div').nth(0);
    if ((await eventHeader.nth(i).locator('div').nth(2).locator('span').nth(0).count()) == 1) {
      const country = await eventHeader.nth(i).locator('div').nth(2).locator('span').nth(0).innerHTML();
      const competition = await eventHeader.nth(i).locator('div').nth(2).locator('span').nth(1).innerHTML();
      for (let idx = 0; idx < myLeagues.length; idx++) {
        if (country === myLeagues[idx].country && competition === myLeagues[idx].competition) {
          await star.click();
          const toggleText = eventHeader.nth(i).locator('div').nth(0).locator('span').nth(2);
          const x = eventHeader.nth(i).locator('div').nth(0).locator('svg').nth(1);
          if ((await toggleText.innerHTML()) === 'Remove this league from My Leagues!') {
            await x.click();
          } else if ((await toggleText.innerHTML()) === 'Add this league to My Leagues!') {
            await toggleText.click();
          }
        }
      }
    }
  }
};
