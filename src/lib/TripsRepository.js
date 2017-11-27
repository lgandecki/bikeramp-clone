const moment = require('moment')
const _ = require('lodash')

let trips = []
class TripsRepository {
  static save(trip) {
    trips.push(trip)
  }
  static findAllWeekly(currentTimestamp = moment().format('X')) {
    const startingTimestamp = moment.unix(+currentTimestamp).subtract(7, 'days').format('X')
    return this._findAfterTimestamp(startingTimestamp)
  }

  static findAllMonthly(currentTimestamp = moment().format('X')) {
    const startingTimestamp = moment.unix(+currentTimestamp).startOf('month').format('X')
    return this._findAfterTimestamp(startingTimestamp)
  }
  static _findAfterTimestamp(timestamp) {
    return _.filter(trips, (trip) => trip.date >= timestamp)
  }
}

module.exports = {
  default: TripsRepository,
  trips
}
