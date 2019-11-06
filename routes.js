const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs')
const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {})

const server = app.listen(5000, function () {})

async function logFetch (url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:5000/')
  const routes = await page.evaluate(() => window.SISroutes)
  await browser.close()
  return routes
}

logFetch().then(sum => {
  const json = `{
    "renderRoutes": [${sum}],
    "useRenderEvent": true,
    "headless": true,
    "onlyProduction": true
  }`
  fs.writeFile('.prerender-spa.json', json, function (err) {
    if (err) throw err
    server.close()
  })
})
