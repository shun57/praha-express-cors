const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://ps52bd27.ngrok.app')
  res.header('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  if ('OPTIONS' === req.method) {
    console.log('preflight request!')
    res.sendStatus(200)
  } else {
    console.log('request!')
    next()
  }
}

app.use(allowCrossDomain)

// GET method route
app.get('/', (req, res) => {
  res.status(200).json('OK')
})

// POST method route
app.post('/', (req, res) => {
  console.log(req.body)
  res.status(201).json(req.body)
})

app.listen(port, () => {
  console.log(`host app listening on port ${port}`)
})

// 静的フォーム
const webapp = express()
webapp.use(express.static('public'))

webapp.get('/', (req, res) => {
  res.sendFile('public/app.html', { root: __dirname })
})

webapp.listen(8081, () => {
  console.log('ad app listening on port 8081')
})
