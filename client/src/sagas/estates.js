import { takeLatest } from 'redux-saga';
import {
	put,
	select,
	call
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {actions as toastrActions} from 'react-redux-toastr';
import {
  GET_ESTATES,
	DELETE_ESTATE,
  POST_ESTATE
} from '../constants/estates';
import {
	getEstatesSuccess,
	getEstatesFailure ,
	deleteEstateSuccess,
	deleteEstateFailure,
  postEstateSuccess,
  postEstateFailure
} from '../actions/estates';
import {
  logoutUser
} from '../actions/auth';

const selectedEstates = (state) => {
  return state.getIn(['estates', 'list']).toJS();
}

const selectedPicture = (state) => {
  return state.getIn(['filestack', 'url'], '');
}

const fetchEstates = () => {
  return fetch('http://localhost:8080/estates', {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json());
};

const deleteServerEstate = (id) => {
  return fetch(`http://localhost:8080/estates/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token')
    }),
    method: 'DELETE',
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

const postServerEstate = (estate) => {
  return fetch('http://localhost:8080/estates', {
    headers: new Headers({
      'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token')
    }),
    method: 'POST',
    body: JSON.stringify(estate)
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

function* getEstates () {
  try {
    const estates = yield call(fetchEstates);
    yield put(getEstatesSuccess(estates));
  } catch (e) {
    yield put(getEstatesFailure());
  }
}

function* deleteEstate (action) {
  const { id } = action;
  const estates = yield select(selectedEstates);
  try {
    const result = yield call(deleteServerEstate, id);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retroestates Archive',
       message: result.message
     }));
    yield put(deleteEstateSuccess(estates.filter(estate => estate._id !== id)));
  } catch (e) {
    let message = '';
    if(e.status === 403) {
      yield put(logoutUser());
      message = 'Invalid token. You are being logged off';
    } else {
      yield put(deleteEstateFailure());
      message = 'Sorry, an error occured!';
    }
    localStorage.removeItem('token');
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retroestates Archive',
       message: message
     }));
  }
}

const getEstateForm = (state) => {
  return state.getIn(['form', 'estate']).toJS();
}

function* postEstate () {
  const picture = yield select(selectedPicture);
  const estate = yield select(getEstateForm);
  const newEstate = Object.assign({}, { picture }, estate.values);
  try {
    const result = yield call(postServerEstate, newEstate);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retroestates Archive',
       message: result.message
     }));
    yield put(postEstateSuccess());
    yield put(push('/estates'));
  } catch (e) {
    if(e.status === 403) {
      yield put(logoutUser());
      message = 'Invalid token. You are being logged off';
    } else {
      yield put(postEstateFailure());
      message = 'Sorry, an error occured!';
    }
    localStorage.removeItem('token');
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retroestates Archive',
       message: message
     }));
  }

}

function* watchGetEstates () {
  yield takeLatest(GET_ESTATES, getEstates);
}

function* watchDeleteEstate () {
	yield takeLatest(DELETE_ESTATE, deleteEstate);
}

function* watchPostEstate () {
  yield takeLatest(POST_ESTATE, postEstate);
}

export {
	watchGetEstates,
	watchDeleteEstate,
  watchPostEstate
};
