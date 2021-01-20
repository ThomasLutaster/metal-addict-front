import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';

import authMiddleware from 'src/middlewares/authMiddleware';
import searchFormMiddleware from 'src/middlewares/searchFormMiddleware';
import reviewsMiddleware from 'src/middlewares/reviewsMiddleware';
import eventsMiddleware from 'src/middlewares/eventsMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    authMiddleware,
    searchFormMiddleware,
    reviewsMiddleware,
    eventsMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;
