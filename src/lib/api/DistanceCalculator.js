const distanceCalculator = async function (address, destination, fetch = require('node-fetch')) {
  const key = process.env.GOOGLE_KEY_API || 'AIzaSyAbvtW4q1xsdKgfPmPiaooQgH4ORqz5noQ'
  const endPoint = 'https://maps.googleapis.com/maps/api/distancematrix/json'
  const params = `?mode=bicycling&language=pl-PL&key=${key}` +
  `&origins=${encodeURIComponent(address)}&destinations=${encodeURIComponent(destination)}`

  const url = `${endPoint}${params}`
  let data
  let parsed

  try {
    data = await fetch(url)
    parsed = await data.json()
  } catch (e) {
    throw new Error(e)
  }

  return parsed.rows[0].elements[0].distance.text
}

module.exports = distanceCalculator
