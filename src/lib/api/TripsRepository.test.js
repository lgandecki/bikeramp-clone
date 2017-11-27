const moment = require('moment')
const TripsRepository = require('./TripsRepository').default
let trips = require('./TripsRepository').trips

const resetTrips = () => {
  trips.length = 0
}

test('saves trips and', () => {
  resetTrips()
  const newTrip = {date: 'sdfs'}

  TripsRepository.save(newTrip)

  expect(trips).toMatchObject([newTrip])
})

test('find trips by weekly', () => {
  resetTrips()
  trips.push(
    {date: moment('2010-10-10').format('X')},
    {date: moment('2010-09-10').format('X')},
    {date: moment('2010-10-11').format('X')},
    {date: moment('2010-08-10').format('X')},
    {date: moment('2010-10-6').format('X')}
    )
  const currentTimestamp = moment('2010-10-12').format('X')
  const allWeekly = TripsRepository.findAllWeekly(currentTimestamp)

  expect(allWeekly).toMatchObject([
    {date: moment('2010-10-10').format('X')},
    {date: moment('2010-10-11').format('X')},
    {date: moment('2010-10-6').format('X')},
  ])
})

test('ignores trips 8 days ago when finding by weekly', () => {
  resetTrips()
  trips.push(
    {date: moment('2010-10-4').format('X')},
    {date: moment('2010-10-5').format('X')}
    )

  const currentTimestamp = moment('2010-10-12').format('X')
  const allWeekly = TripsRepository.findAllWeekly(currentTimestamp)

  expect(allWeekly).toMatchObject([
    {date: moment('2010-10-5').format('X')}
  ])
})

test('find trips by montjly', () => {
  resetTrips()
  trips.push(
    {date: moment('2010-10-4').format('X')},
    {date: moment('2010-10-25').format('X')},
    {date: moment('2010-09-5').format('X')}
  )

  const currentTimestamp = moment('2010-10-30').format('X')
  const allMonthly = TripsRepository.findAllMonthly(currentTimestamp)

  expect(allMonthly).toMatchObject([
    {date: moment('2010-10-4').format('X')},
    {date: moment('2010-10-25').format('X')}
  ])

})
