import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
} from '../actions/protected-data';

const initialState = {
  data: [ {}, ],
  buttonState: 'submit',
  feedback: 'Correct!',
  error: null,
};
// Convert to spead operator instead of Object.assign.
export default function reducer (state = initialState, action) {
  console.log(action);
  switch (action.type) {
  case FETCH_PROTECTED_DATA_SUCCESS:
    return Object.assign({}, state, {
      data: action.data,
      error: null,
    });
  case FETCH_PROTECTED_DATA_ERROR:
    return Object.assign({}, state, {error: action.error,});
  default:
    return state;
  }
}
