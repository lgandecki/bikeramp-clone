const moment = require('moment')
const statsWeekly = require('./statsWeekly')
let trips = require('./TripsRepository').trips

test('it returns weekly statistics', () => {
  trips.push(
    {date: moment('2010-10-10').format('X'), distance: 1000, price: 1},
    {date: moment('2010-09-10').format('X'), distance: 2000, price: 123},
    {date: moment('2010-10-11').format('X'), distance: 1000, price: 1},
    {date: moment('2010-08-10').format('X'), distance: 2000, price: 3},
    {date: moment('2010-10-06').format('X'), distance: 1000, price: 1}
  )

  const currentTimestamp = moment('2010-10-12').format('X')

  const weeklyStats = statsWeekly(currentTimestamp)

  expect(weeklyStats).toMatchObject({
    total_distance: '3km',
    total_price: '3.00PLN'
  })
})
