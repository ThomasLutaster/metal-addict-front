import axios from 'axios';

import {
  FETCH_BANDS,
  FETCH_COUNTRIES,
  updateBands,
  updateCountries,
  SUBMIT_EVENTS_SEARCH,
  updatedLoadingBands,
  updatedLoadingCountries,
} from 'src/actions/searchForm';

import { setLoadingEvents, saveEventsResults, hideSearchEvents } from 'src/actions/events';

const searchFormMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_BANDS:
      axios.get('/band')
        .then((response) => {
          store.dispatch(updateBands(response.data));
        })
        .catch((error) => {
          console.log(error);
          action.history.push('/erreur');
        })
        .finally(() => {
          store.dispatch(updatedLoadingBands());
        });
      next(action);
      break;

    case FETCH_COUNTRIES:
      axios.get('/country')
        .then((response) => {
          store.dispatch(updateCountries(response.data));
        })
        .catch((error) => {
          console.log(error);
          action.history.push('/erreur');
        })
        .finally(() => {
          store.dispatch(updatedLoadingCountries());
        });
      next(action);
      break;

    case SUBMIT_EVENTS_SEARCH: {
      const {
        band,
        city,
        venue,
        country,
        year,
      } = store.getState().searchForm;

      store.dispatch(hideSearchEvents());
      store.dispatch(setLoadingEvents(true));
      axios.get('/event', {
        params: {
          cityName: city,
          venueName: venue,
          countryId: country === null ? '' : country.id,
          year: year === null ? '' : year.id,
          p: 1,
          artistId: band.id,
        },
      })
        .then((response) => {
          store.dispatch(saveEventsResults(response.data));
        })
        .catch((error) => {
          console.log(error);
          action.history.push('/erreur');
        })
        .finally(() => {
          store.dispatch(setLoadingEvents(false));
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default searchFormMiddleware;
