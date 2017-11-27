const distanceCalculator = async function (address, destination, fetch = require('node-fetch')) {
  const key = process.env.GOOGLE_KEY_API || 'AIzaSyAbvtW4q1xsdKgfPmPiaooQgH4ORqz5noQ'
  const endPoint = 'https://maps.googleapis.com/maps/api/distancematrix/json'
  const params = `?mode=bicycling&language=pl-PL&key=${key}` +
    `&origins=${encodeURIComponent(address)}&destinations=${encodeURIComponent(destination)}`

  const url = `${endPoint}${params}`

  const data = await fetch(url)
  const json = await data.json()

  return json.rows[0].elements[0].distance.value
}

module.exports = distanceCalculator
