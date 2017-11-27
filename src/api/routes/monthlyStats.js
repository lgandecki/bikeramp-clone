const statsMonthly = require('../lib/statsMonthly');

module.exports = (app) => {
  app.get('/api/stats/monthly', (req, res) => {
    res.send(statsMonthly());
  });
};
