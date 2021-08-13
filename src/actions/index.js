import axios from 'axios';
import { url } from 'routes';

export const regREQUEST = 'regREQUEST';
export const regSUCCESS = 'regSUCCESS';

export const authREQUEST = 'authREQUEST';
export const authSUCCESS = 'authSUCCESS';

export const fetchREQUEST = 'fetchREQUEST';
export const fetchSUCCESS = 'fetchSUCCESS';

export const addREQUEST = 'addREQUEST';
export const addSUCCESS = 'addSUCCESS';

export const updateREQUEST = 'updateREQUEST';
export const updateSUCCESS = 'updateSUCCESS';

export const removeREQUEST = 'removeREQUEST';
export const removeSUCCESS = 'removeSUCCESS';

export const resetSUCCESS = 'resetSUCCESS';

export const reg = (username, password) =>
  (dispatch) => {
    dispatch({ type: regREQUEST });
    return axios({
      method: 'POST',
      withCredentials: true,
      url: url + '/users/register',
      data: { username, password },
    })
      .then(() => {
        dispatch({ type: regSUCCESS });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  }

export const auth = (username, password) =>
  (dispatch) => {
    dispatch({ type: authREQUEST });
    return axios({
      method: 'POST',
      withCredentials: true,
      url: url + '/users/login',
      data: { username, password },
    })
      .then(payload => {
        dispatch({ type: authSUCCESS, payload });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  }

export const fetch = () =>
  (dispatch, getState) => {
    dispatch({ type: fetchREQUEST });
    return axios({
      method: "GET",
      withCredentials: true,
      url: url + '/elements',
      data: { params: { user: getState().user } },
    })
      .then(({ data }) => {
        dispatch({
          type: fetchSUCCESS,
          payload: { data }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  }

export const add = (content) =>
  (dispatch, getState) => {
    dispatch({ type: addREQUEST });
    return axios({
      method: "POST",
      withCredentials: true,
      url: url + '/elements',
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: addSUCCESS,
          payload: { data },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  };

export const update = (content, _id) =>
  (dispatch, getState) => {
    dispatch({ type: updateREQUEST });
    return axios({
      method: "PUT",
      withCredentials: true,
      url: url + '/elements/' + _id,
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: updateSUCCESS,
          payload: { data, _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  }

export const remove = (_id) =>
  (dispatch) => {
    dispatch({ type: removeREQUEST });
    return axios({
      method: "DELETE",
      withCredentials: true,
      url: url + '/elements/' + _id,
    })
      .then(() => {
        dispatch({
          type: removeSUCCESS,
          payload: { _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: resetSUCCESS });
        window.location.reload();
      });
  }

export const reset = {
  type: resetSUCCESS,
};
