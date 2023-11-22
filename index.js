const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require("path")

// static file 
// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Router
require('./src/routes')(app)

// config mongodb
//require('./db/mongodb').connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})