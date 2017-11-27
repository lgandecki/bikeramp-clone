const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

require('./api/routes')(app)

app.listen(port, () => {
  console.log('App started on port ' + port)
})
