const router = require('express').Router();
const scrapper = require('./puppeteer');

router.get('/', (req, res) => {
	res.render('home');
});
router.post('/', async (req, res) => {
	console.log(req.body);
	// res.json(req.body);
	let resp = await scrapper(req.body.url);
	console.log(resp);
	if (resp.success) {
		res.render('results', { data: resp.data });
	} else {
	}
});
module.exports = router;
