const td = require('testdouble')
const distanceCalculator = require('./distanceCalculator')

if (process.env.RUN_SLOW) {
  test('calculates distance', async () => {
    const address = 'Warszawa Plac Defilad'
    const destination = 'Lublin Organowa'

    const distance = await distanceCalculator(address, destination)

    expect(distance).toEqual(190698)
  })
}

test('uses proper url', () => {
  const fetch = td.function()

  const resolver = {
    json: () => {
      return {rows: [{elements: [{distance: { value: '191'}}]}]}
    }
  }

  td.when(fetch(td.matchers.anything())).thenResolve(resolver)

  const address = 'Warszawa Plac Defilad'
  const destination = 'Lublin Organowa'
  distanceCalculator(address, destination, fetch)

  td.verify(fetch('https://maps.googleapis.com/maps/api/distancematrix/json' +
    '?mode=bicycling&language=pl-PL&key=AIzaSyAbvtW4q1xsdKgfPmPiaooQgH4ORqz5noQ&origins=Warszawa%20Plac%20Defilad&destinations=Lublin%20Organowa'))


})
