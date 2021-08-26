import axios from 'axios';
import { url } from 'routes';

export const REG = 'REG';
export const AUTH = 'AUTH';
export const FETCH = 'FETCH';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const RESET = 'RESET';

export const reg = (username, password) =>
  (dispatch) => {
    return axios({
      method: 'POST',
      withCredentials: true,
      url: url + '/users/register',
      data: { username, password },
    })
      .then(() => {
        dispatch({ type: REG });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const auth = (username, password) =>
  (dispatch) => {
    return axios({
      method: 'POST',
      withCredentials: true,
      url: url + '/users/login',
      data: { username, password },
    })
      .then(payload => {
        dispatch({ type: AUTH, payload });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const fetch = () =>
  (dispatch, getState) => {
    return axios({
      method: "GET",
      withCredentials: true,
      url: url + '/elements',
      data: { params: { user: getState().user } },
    })
      .then(({ data }) => {
        dispatch({
          type: FETCH,
          payload: { data }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const add = (content) =>
  (dispatch, getState) => {
    return axios({
      method: "POST",
      withCredentials: true,
      url: url + '/elements',
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: ADD,
          payload: { data },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  };

export const update = (content, _id) =>
  (dispatch, getState) => {
    return axios({
      method: "PUT",
      withCredentials: true,
      url: url + '/elements/' + _id,
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: UPDATE,
          payload: { data, _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const remove = (_id) =>
  (dispatch) => {
    return axios({
      method: "DELETE",
      withCredentials: true,
      url: url + '/elements/' + _id,
    })
      .then(() => {
        dispatch({
          type: REMOVE,
          payload: { _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const reset = {
  type: RESET,
};
