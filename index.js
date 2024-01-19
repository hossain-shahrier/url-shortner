const express = require('express')
const path = require('path')
const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const { connect } = require('mongoose')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connect('mongodb://127.0.0.1:27017/url-shortner-v1').then(() => console.log('Database connected')).catch((err) => console.error(err))

app.use("/url", urlRoute)
app.use('/', staticRouter)

app.listen(PORT, () => console.log(`Server started at ${PORT}`))