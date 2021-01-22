import axios from 'axios';

import {
  FETCH_LAST_REVIEWS,
  saveLastReviews,
  showLoader,
} from 'src/actions/reviews';

const reviewsMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);
  switch (action.type) {
    case FETCH_LAST_REVIEWS:
      // store.dispatch(showLoader());
      axios.get('/review?limit=6&order=ASC')
        .then((response) => {
          // console.log(response);
          store.dispatch(saveLastReviews(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default reviewsMiddleware;
