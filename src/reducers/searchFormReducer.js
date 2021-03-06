import {
  UPDATE_BANDS,
  UPDATE_COUNTRIES,
  UPDATE_BAND,
  UPDATE_COUNTRY,
  UPDATE_CITY,
  UPDATE_YEAR,
  UPDATE_EVENTPLACE,
  UPDATE_LOADING_BANDS,
  UPDATE_LOADING_COUNTRIES,
} from 'src/actions/searchForm';

import { RESET_HOME_PAGE } from 'src/actions/home';

const initialState = {
  // contenu du champs nom du groupe
  band: null,

  country: null,

  city: '',

  year: null,

  venue: '',

  loadingBands: true,

  loadingCountries: true,

  bands: [],

  countries: [],
};

function searchFormReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_BANDS:
      return {
        ...state,
        bands: action.bands,
      };

    case UPDATE_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
      };

    case UPDATE_BAND:
      return {
        ...state,
        band: action.value,
      };

    case UPDATE_COUNTRY:
      return {
        ...state,
        country: action.value,
      };

    case UPDATE_CITY:
      return {
        ...state,
        city: action.value,
      };

    case UPDATE_YEAR:
      return {
        ...state,
        year: action.value,
      };

    case UPDATE_EVENTPLACE:
      return {
        ...state,
        venue: action.value,
      };

    case UPDATE_LOADING_BANDS:
      return {
        ...state,
        loadingBands: false,
      };

    case UPDATE_LOADING_COUNTRIES:
      return {
        ...state,
        loadingCountries: false,
      };

    case RESET_HOME_PAGE:
      return {
        ...state,
        band: null,
        country: null,
        city: '',
        year: null,
        venue: '',
      };

    default:
      return state;
  }
}

export default searchFormReducer;
