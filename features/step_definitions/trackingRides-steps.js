const axios = require('axios')
const moment = require('moment')
const {expect} = require('chai')
const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, When, Then}) => {
  Given('I have existing trips in the system', async () => {
    const {host, currentDayTimestamp} = generateContext()

    await axios.post(`${host}/api/trips`, {
      start_address: 'Organowa 1, Lublin, Polska',
      destination_address: 'Plac Europejski 2, Warszawa, Polska',
      price: 1,
      date: currentDayTimestamp
    })
  })

  When('I add a new trip to the system', async () => {
    const {host, currentDayTimestamp} = generateContext()

    await axios.post(`${host}/api/trips`, {
      start_address: 'Jerozolimskie 122, Warszawa, Polska',
      destination_address: 'Plac Europejski 2, Warszawa, Polska',
      price: 10,
      date: currentDayTimestamp
    })
  })

  Then('I can see updated weekly stats', async () => {
    const {host} = generateContext()
    const expectedData = {total_distance: '198km', total_price: '11.00PLN'}

    const response = await axios.get(`${host}/api/stats/weekly`)

    expect(response.data).to.deep.equal(expectedData)
  })

  Then('I can see updated monthly stats', async () => {
    const {host, currentDayTimestamp} = generateContext()
    const day = moment.unix(currentDayTimestamp).format('MMMM, Do')
    const expectedData = [
      {
        day,
        total_distance: '198km',
        avg_ride: '99km',
        avg_price: '5.50PLN'
      }
    ]

    const response = await axios.get(`${host}/api/stats/monthly`)

    expect(response.data).to.deep.equal(expectedData)
  })
})

const generateContext = () => {
  return {
    host: 'http://localhost:3000',
    currentDayTimestamp: moment().format('X')
  }
}
