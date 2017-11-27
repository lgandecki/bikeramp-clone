const moment = require('moment')
const statsMonthly = require('./statsMonthly')
let trips = require('./TripsRepository').trips

test('it returns monthly statistics', () => {
  trips.push(
    {date: moment('2010-10-10').format('X'), distance: 1000, price: 1},
    {date: moment('2010-10-10').format('X'), distance: 1000, price: 1},
    {date: moment('2010-10-11').format('X'), distance: 2000, price: 3},
    {date: moment('2010-10-11').format('X'), distance: 2000, price: 3},
    {date: moment('2010-09-06').format('X'), distance: 1000, price: 1}
  )

  const currentTimestamp = moment('2010-10-12').format('X')

  const monthlyStats = statsMonthly(currentTimestamp)

  expect(monthlyStats).toMatchObject([
    {
      'day': 'October, 10th',
      'total_distance': '2km',
      'avg_ride': '1km',
      'avg_price': '1.00PLN'
    },
    {
      'day': 'October, 11th',
      'total_distance': '4km',
      'avg_ride': '2km',
      'avg_price': '3.00PLN'
    }
  ])
})
