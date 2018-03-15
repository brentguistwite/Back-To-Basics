import { API_BASE_URL, } from '../config';
import { normalizeResponseErrors, } from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
  type: FETCH_PROTECTED_DATA_SUCCESS,
  data,
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error,
});

export const fetchProtectedData = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const id = getState().auth.currentUser.id;
  return fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(fetchProtectedDataSuccess(data)))
    .catch((err) => {
      dispatch(fetchProtectedDataError(err));
    });
};

export const ANSWER_SUBMISSION_SUCCESS = 'ANSWER_SUBMISSION_SUCCESS';
export const answerSubmissionSuccess = feedback => ({
  type: ANSWER_SUBMISSION_SUCCESS,
  feedback,
});

export const sendAnswerForValidation = answer => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const id = getState().auth.currentUser.id;
  return fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ answer,}),
    headers: {
      // Provide our auth token as credentials
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(answerSubmissionSuccess(data)))
    .catch((err) => {
      dispatch(fetchProtectedDataError(err));
    });
};
