const td = require('testdouble')
const addTrip = require('./addTrip')
const TripsRepository = require('./TripsRepository').default

test('it saves trip information', async () => {
  const passedTripInfo = {
    date: 'date',
    price: 10,
    address: 'address',
    destination: 'destination'
  }
  const TripsRepositoryMock = td.function(TripsRepository)
  const distanceCalculator = td.function()

  td.when(distanceCalculator(passedTripInfo.address, passedTripInfo.destination)).thenResolve(1000)

  await addTrip(passedTripInfo, distanceCalculator, TripsRepositoryMock)

  td.verify(TripsRepositoryMock.save({date: 'date', price: 10, distance: 1000}))
})
