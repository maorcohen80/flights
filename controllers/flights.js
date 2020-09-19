const fetch = require('node-fetch');
const moment = require('moment');
const { API_KEY } = require('../consts');

exports.getFlights = async (req, res, next) => {
  let flightsCounter = 0;
  let flightList = '';
  try {
    const timeInThreeHours = moment().add(3, 'hours');
    const apiResponse = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=JFK`);
    if (apiResponse.status === 200) {
      const flightsData = await apiResponse.json();
      const flightsFromJFK = flightsData.data;
      const sortedFlightByDepTime = flightsFromJFK.sort((flightA, flightB) =>
        new moment(flightA.departure.scheduled) - new moment(flightB.departure.scheduled));

      sortedFlightByDepTime.map(flight => {
        const flightDepTime = flight.departure.scheduled;
        const diff = timeInThreeHours.diff(flightDepTime, 'hours');
        if (diff <= 3) {
          flightsCounter += 1;
          flightList += `<li>${flight.flight.iata} - Departure at ${flight.departure.scheduled.split('T')[1].split('+')[0]}</li>`;
        }
      });
    }
    else {
      throw new Error(apiResponse.error)
    }

  }
  catch (err) {
    console.log('err', err)
  }

  res.send(`
  <h1>Total Flights From JFK Departure Time in 3 Hours: ${flightsCounter}</h1>
  <ul>${flightList}</ul>
  `
  )

}