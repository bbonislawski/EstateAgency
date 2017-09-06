import Immutable from 'immutable';
import {
  GET_ESTATES_SUCCESS,
  GET_ESTATES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_ESTATE,
  DELETE_ESTATE_SUCCESS,
  DELETE_ESTATE_FAILURE
} from '../constants/estates';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ESTATE_SUCCESS:
    case GET_ESTATES_SUCCESS: {
      return state.merge({ list: action.estates });
    }
    case SET_SEARCH_BAR: {
      return state.merge({ searchBar: action.keyword });
    }
    case SHOW_SELECTED_ESTATE: {
      return state.merge({ selectedEstate: action.estate });
    }
    case DELETE_ESTATE_FAILURE:
    case GET_ESTATES_FAILURE: {
      return state.clear();
    }
    default:
      return state;
  }
}
