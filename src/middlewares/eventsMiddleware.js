import axios from 'axios';

import {
  FETCH_SET_LIST_API_MORE_EVENTS,
  setLoadingEvents,
  saveSetListApiMoreEvents,
} from 'src/actions/events';

import { FETCH_USER_EVENTS, saveUserEvents } from 'src/actions/users';

import { convertEventsIntoSetlistEvents } from 'src/utils';

const eventsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_SET_LIST_API_MORE_EVENTS: {
      const {
        band,
        country,
        city,
        year,
        venue,
      } = store.getState().searchForm;

      const { searchEvents } = store.getState().events;

      store.dispatch(setLoadingEvents(true));
      axios.get('/event', {
        params: {
          cityName: city,
          venueName: venue,
          countryId: country === null ? '' : country.id,
          year: year === null ? '' : year.id,
          p: searchEvents.page + 1,
          artistId: band.id,
        },
      })
        .then((response) => {
          store.dispatch(saveSetListApiMoreEvents(response.data));
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

    case FETCH_USER_EVENTS:
      store.dispatch(setLoadingEvents(true));
      axios.get(`/event?user=${action.userId}&order=DESC`)
        .then((response) => {
          const setListEvents = convertEventsIntoSetlistEvents(response.data);
          store.dispatch(saveUserEvents(setListEvents));
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

    default:
      next(action);
  }
};
export default eventsMiddleware;
