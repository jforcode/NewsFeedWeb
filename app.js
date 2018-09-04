require('dotenv').config()
const compression = require('compression')
const express = require('express')

const app = express()

app.use(compression())
app.use(express.static('dist'))

const port = process.env.server_port
app.listen(port, () => console.log('Server started at ' + port))
