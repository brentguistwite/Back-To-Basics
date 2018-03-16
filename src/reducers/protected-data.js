import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  ANSWER_SUBMISSION_SUCCESS,
} from '../actions/protected-data';

const initialState = {
  data: [ {}, ],
  buttonState: 'Submit',
  feedback: '',
  error: null,
  timesSeen: 0,
  timesCorrect: 0,
};
// Convert to spead operator instead of Object.assign.
export default function reducer (state = initialState, action) {
  console.log(action);
  switch (action.type) {
  case FETCH_PROTECTED_DATA_SUCCESS:
    return Object.assign({}, state, {
      data: action.data,
      buttonState: 'Submit',
      timesSeen: action.data.timesSeen,
      timesCorrect: action.data.timesCorrect,
      error: null,
    });
  case FETCH_PROTECTED_DATA_ERROR:
    return Object.assign({}, state, {error: action.error,});
  case ANSWER_SUBMISSION_SUCCESS:
    return Object.assign({}, state, {
      feedback: action.feedback,
      error: null,
      buttonState: 'Next',
    });
  default:
    return state;
  }
}
