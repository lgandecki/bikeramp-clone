const tripsRoute = require('./trips')
const weeklyStatsRoute = require('./weeklyStats')
const monthlyStatsRoute = require('./monthlyStats')

module.exports = (app) => {
  tripsRoute(app)
  weeklyStatsRoute(app)
  monthlyStatsRoute(app)
}
