import {
  GET_ESTATES,
  GET_ESTATES_SUCCESS,
  GET_ESTATES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_ESTATE,
  DELETE_ESTATE,
  DELETE_ESTATE_SUCCESS,
  DELETE_ESTATE_FAILURE,
  POST_ESTATE,
  POST_ESTATE_SUCCESS,
  POST_ESTATE_FAILURE
} from '../constants/estates';


function getEstates () {
  return {
    type: GET_ESTATES
  };
}

function getEstatesSuccess (estates) {
  return {
    type: GET_ESTATES_SUCCESS,
    estates
  };
}

function getEstatesFailure () {
  return {
    type: GET_ESTATES_FAILURE
  };
}

function setSearchBar (keyword) {
  return {
    type: SET_SEARCH_BAR,
    keyword
  };
}

function showSelectedEstate (estate) {
  return {
    type: SHOW_SELECTED_ESTATE,
    estate
  };
}

function deleteEstate (id) {
  return {
    type: DELETE_ESTATE,
    id
  };
}

function deleteEstateSuccess (estates) {
  return {
    type: DELETE_ESTATE_SUCCESS,
    estates
  };
}

function deleteEstateFailure () {
  return {
    type: DELETE_ESTATE_FAILURE
  };
}

function postEstate () {
  return {
    type: POST_ESTATE
  };
}

function postEstateSuccess () {
  return {
    type: POST_ESTATE_SUCCESS
  };
}

function postEstateFailure () {
  return {
    type: POST_ESTATE_FAILURE
  };
}

export {
  getEstates,
  getEstatesSuccess,
  getEstatesFailure,
  setSearchBar,
  showSelectedEstate,
  deleteEstate,
  deleteEstateSuccess,
  deleteEstateFailure,
  postEstate,
  postEstateSuccess,
  postEstateFailure
};
