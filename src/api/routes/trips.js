const addTrip = require('../lib/addTrip');

module.exports = (app) => {
  app.post('/api/trips', async (req, res) => {
    const { start_address, destination_address, price, date } = req.body;
    const data = {
      address: start_address,
      destination: destination_address,
      price,
      date
    }
    await addTrip(data)
    res.end();
  });
};
