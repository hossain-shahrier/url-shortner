const express = require('express')
const urlRoute = require('./routes/url')
const { connect } = require('mongoose')
const app = express()
const PORT = 8000

app.use(express.json())
connect('mongodb://127.0.0.1:27017/url-shortner-v1').then(() => console.log('Database connected')).catch((err) => console.error(err))
app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))