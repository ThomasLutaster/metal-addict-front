export const SET_LOADING_PICTURES = 'SET_LOADING_PICTURES';
export const FETCH_EVENT_PICTURES = 'FETCH_EVENT_PICTURES';
export const SAVE_EVENT_PICTURES = 'SAVE_EVENT_PICTURES';
export const ADD_EVENT_PICTURE = 'ADD_EVENT_PICTURE';
export const ADD_REVIEW_PICTURE = 'ADD_REVIEW_PICTURE';

export const setLoadingPictures = (value) => ({
  type: SET_LOADING_PICTURES,
  value,
});

export const fetchEventPictures = (setlistId, history) => ({
  type: FETCH_EVENT_PICTURES,
  setlistId,
  history,
});

export const saveEventPictures = (pictures) => ({
  type: SAVE_EVENT_PICTURES,
  pictures,
});

export const addEventPicture = (picture) => ({
  type: ADD_EVENT_PICTURE,
  picture,
});

export const addReviewPicture = (picture) => ({
  type: ADD_REVIEW_PICTURE,
  picture,
});
