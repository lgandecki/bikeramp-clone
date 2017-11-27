const td = require('testdouble')
const addTrip = require('./addTrip')
const TripsRepository = require('./TripsRepository').default

test('it saves trip information', () => {
  const passedTripInfo = {
    date: 'date',
    price: '10',
    address: 'address',
    destination: 'destination'
  }
  const TripsRepositoryMock = td.function(TripsRepository)
  const distanceCalculator = td.function()

  td.when(distanceCalculator(passedTripInfo.address, passedTripInfo.destination)).thenReturn('10km')

  addTrip(passedTripInfo, distanceCalculator, TripsRepositoryMock)

  td.verify(TripsRepositoryMock.save({date: 'date', price: '10', distance: '10km'}))
})
