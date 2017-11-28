const addTrip = async ({date, address, destination, price},
                       distanceCalculator = require('./distanceCalculator'),
                       TripsRepository = require('./TripsRepository').default) => {
  const distance = await distanceCalculator(address, destination)
  const trip = {
    date, price, distance
  }
  TripsRepository.save(trip)
}

module.exports = addTrip
