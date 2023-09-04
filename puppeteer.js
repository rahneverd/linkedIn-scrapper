const puppeteer = require('puppeteer');
const URL = require('url').URL;
let adress;
let followersCount;
let connectionsCount;
module.exports = async function scrapper(url) {
	try {
		// Check if URL is valid
		new URL(url);

		// Launch the browser and open a new blank page
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();

		// Set default time out
		await page.setDefaultNavigationTimeout(0);

		// Navigate the page to a URL
		await page.goto(url);

		// Wait for navigation to complete
		// await page.waitForNavigation();

		// Close the loggin popup
		await page.$eval(
			'#public_profile_contextual-sign-in > div > section > button',
			(el) => {
				el.click();
			}
		);

		// Get address
		address = await page.$$eval('.top-card__subline-item', (el) => {
			return el[0].innerText;
		});

		// Get followers count
		followersCount = await page.$$eval('.top-card__subline-item', (el) => {
			return el[1].innerText.split(' ')[0];
		});

		// Get connections count
		connectionsCount = await page.$$eval('.top-card__subline-item', (el) => {
			return el[2].innerText.split(' ')[0];
		});

		console.log('url from scrapper here: ', url);
		console.log('address: ', address);
		console.log('followers count: ', followersCount);
		console.log('connections count: ', connectionsCount);
		page.close();
		return {
			success: true,
			data: {
				address: address,
				followersCount: followersCount,
				connectionsCount: connectionsCount,
			},
		};
	} catch (err) {
		console.log('err: ', err);
	}
};
