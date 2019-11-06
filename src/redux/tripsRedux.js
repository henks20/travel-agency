/* SELECTORS */

export const getAllTrips = ({ trips }) => trips;

export const getFilteredTrips = ({ trips, filters }) => {
  let output = trips;

  // filter by search phrase
  if (filters.searchPhrase) {
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO DONE- filter by duration
  output = output.filter(trip => parseInt(filters.duration.from, 10) <= trip.days && trip.days <= parseInt(filters.duration.to, 10));
  // TODO DONE- filter by tags
  if (filters.tags.length > 0) {
    output = output.filter(trip => trip.tags.map(item => filters.tags.includes(item)).includes(true));
  }
  // TODO DONE- sort by cost descending (most expensive goes first)
  output.sort(function (a, b) {
    const valueA = Number(a.cost.replace(/[^0-9.-]+/g, ''));
    const valueB = Number(b.cost.replace(/[^0-9.-]+/g, ''));
    return valueB - valueA;
  });
  return output;
};

export const getTripById = ({ trips }, tripId) => {
  const filtered = trips;
  // TODO DONE- filter trips by tripId
  filtered.filter(trip => trip.tripId === tripId);

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : { error: true };
};

export const getTripsForCountry = ({ trips }, countryCode) => {
  const filtered = trips;
  // TODO DONE- filter trips by countryCode
  filtered.filter(trip => trip.countryCode === countryCode);

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{ error: true }];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
