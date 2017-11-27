const addTrip = require('../lib/addTrip');
const distanceCalculator = require('../lib/distanceCalculator')
const TripsRepository = require('../lib/TripsRepository').default

module.exports = (app) => {
  app.post('/api/trips', (req, res) => {
    const { start_address, destination_address, price, date } = req.body;
    const data = {
      address: start_address,
      destination: destination_address,
      price,
      date
    }
    addTrip(data, distanceCalculator, TripsRepository)
    res.end();
  });
};
