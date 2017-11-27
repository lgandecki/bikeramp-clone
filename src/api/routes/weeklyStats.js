const statsWeekly = require('../lib/statsWeekly');

module.exports = (app) => {
  app.get('/api/stats/weekly', (req, res) => {
    res.send(statsWeekly());
  });
};
