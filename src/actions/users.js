export const FETCH_USER_EVENTS = 'FETCH_USER_EVENTS';
export const FETCH_USER_REVIEWS = 'FETCH_USER_REVIEWS';
export const FETCH_USER_PICTURES = 'FETCH_USER_PICTURES';
export const FETCH_USER_DATAS = 'FETCH_USER_DATAS';
export const SAVE_USER_REVIEWS = 'SAVE_USER_REVIWS';
export const SAVE_USER_EVENTS = 'SAVE_USER_EVENTS';
export const SAVE_USER_PICTURES = 'SAVE_USER_PICTURES';
export const SAVE_USER_DATAS = 'SAVE_USER_DATAS';
export const SET_LOADING_USER = 'SET_LOADING_USER';

export const fetchUserEvents = (userId, history) => ({
  type: FETCH_USER_EVENTS,
  userId,
  history,
});

export const fetchUserReviews = (userId, history) => ({
  type: FETCH_USER_REVIEWS,
  userId,
  history,
});

export const fetchUserPictures = (userId, history) => ({
  type: FETCH_USER_PICTURES,
  userId,
  history,
});

export const fetchUserDatas = (userId, history) => ({
  type: FETCH_USER_DATAS,
  userId,
  history,
});

export const saveUserEvents = (events) => ({
  type: SAVE_USER_EVENTS,
  events,
});

export const saveUserReviews = (reviews) => ({
  type: SAVE_USER_REVIEWS,
  reviews,
});

export const saveUserPictures = (pictures) => ({
  type: SAVE_USER_PICTURES,
  pictures,
});

export const saveUserDatas = (datas) => ({
  type: SAVE_USER_DATAS,
  datas,
});

export const setLoadingUser = (value) => ({
  type: SET_LOADING_USER,
  value,
});
