const shortid = require('shortid')
const URL = require('../models/url')

async function generateNewShortURL(req, res) {
    const body = req.body; // get the data from request body

    if (!body.url) return res.status(400).json({ message: 'URL is required' })

    const shortId = shortid(8)

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,

        visitedHistory: []
    })

    return res.json({ id: shortId })
}

async function redirectShortUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId: shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }
    )
    res.redirect(entry.redirectURL)
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId

    const result = await URL.findOne({ shortId })

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
module.exports = {
    generateNewShortURL,
    redirectShortUrl,
    getAnalytics
}