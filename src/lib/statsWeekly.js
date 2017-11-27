const moment = require('moment')
const TripsRepository = require('./TripsRepository').default

const statsWeekly = (currentTimestamp = moment().format('X')) => {
  const weeklyData = TripsRepository.findAllWeekly(currentTimestamp)

  let totalDistance = 0
  let totalPrice = 0.00

  weeklyData.forEach((record) => {
    totalDistance += record.distance
    totalPrice += record.price
  })

  return {
    total_distance: `${Math.round(totalDistance/1000)}km`,
    total_price: `${totalPrice.toFixed(2)}PLN`
  }
}

module.exports = statsWeekly
