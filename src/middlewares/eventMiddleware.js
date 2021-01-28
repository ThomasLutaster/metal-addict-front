import axios from 'axios';

import {
  FETCH_EVENT,
  FETCH_USERS_PARTICIPATE_IN_EVENT,
  USER_PARTICIPATE_IN_EVENT,
  UPLOAD_PICTURE,
  setLoadingEvent,
  saveEvent,
  saveUsersParticipateInEvent,
  setLoadingUploadPicture,
} from 'src/actions/event';

const eventMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);
  switch (action.type) {
    case FETCH_EVENT: {
      store.dispatch(setLoadingEvent(true));
      axios.get(`/event/${action.setlistId}`)
        .then((response) => {
          store.dispatch(saveEvent(response.data));
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            action.history.push('/page_non_trouvee');
          }
        })
        .finally(() => {
          store.dispatch(setLoadingEvent(false));
        });
      next(action);
      break;
    }
    case FETCH_USERS_PARTICIPATE_IN_EVENT: {
      axios.get(`user?setlistId=${action.setlistId}`)
        .then((response) => {
          store.dispatch(saveUsersParticipateInEvent(response.data));
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 404) {
            store.dispatch(saveUsersParticipateInEvent([])); // TODO : always
          }
        });
      next(action);
      break;
    }
    case USER_PARTICIPATE_IN_EVENT: {
      const { token } = store.getState().auth;

      axios.post(`/event/${action.setlistId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            action.history.push('/connexion');
          }
          else {
            console.log(error);
          }
          // TODO : action.history.push('...');
        });
      next(action);
      break;
    }
    case UPLOAD_PICTURE: {
      const { id } = store.getState().event.data;
      const { token } = store.getState().auth;

      store.dispatch(setLoadingUploadPicture(true));
      axios.post(`/picture/${id}`, action.formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          // TODO : action.history.push('...');
        })
        .finally(() => {
          store.dispatch(setLoadingUploadPicture(false));
        });
      next(action);
      break;
    }
    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default eventMiddleware;
