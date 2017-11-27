const addTrip = ({date, address, destination, price}, distanceCalculator, TripsRepository) => {
  const distance = distanceCalculator(address, destination)
  const trip = {
    date, price, distance
  }
  TripsRepository.save(trip)
}

module.exports = addTrip
