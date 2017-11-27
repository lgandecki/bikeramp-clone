const moment = require('moment')
const _ = require('lodash')
const TripsRepository = require('./TripsRepository').default

const statsMonthly = (currentTimestamp = moment().format('X')) => {
  const monthlyData = TripsRepository.findAllMonthly(currentTimestamp)

  let monthlyStats = []

  monthlyData.forEach((record) => {
    const day = moment.unix(+record.date).format('MMMM, Do')
    let currentDay = _.find(monthlyStats, {day})
    if (!currentDay) {
      currentDay = {
        day,
        total_distance: record.distance,
        total_price: record.price,
        count: 1
      }
      monthlyStats.push(currentDay)
    } else {
      currentDay.total_distance += record.distance
      currentDay.total_price += record.price
      currentDay.count++
    }
  })

  return monthlyStats.map((record) => {
    const {day, total_distance, total_price, count} = record
    return {
      day,
      total_distance: `${Math.round(total_distance / 1000)}km`,
      avg_ride: `${Math.round((total_distance / 1000) / count)}km`,
      avg_price: `${(total_price / count).toFixed(2)}PLN`
    }
  })
}

module.exports = statsMonthly
