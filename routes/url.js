const express = require('express')
const { generateNewShortURL, redirectShortUrl, getAnalytics } = require('../controllers/url')
const router = express.Router()

router.post('/', generateNewShortURL)
router.get("/:shortId", redirectShortUrl)

router.get('/analytics/:shortId', getAnalytics)
module.exports = router