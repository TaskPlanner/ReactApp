import axios from 'axios';
import { url } from 'routes';

export const authREQUEST = 'authREQUEST';
export const authSUCCESS = 'authSUCCESS';
export const authFAILURE = 'authFAILURE';

export const fetchREQUEST = 'fetchREQUEST';
export const fetchSUCCESS = 'fetchSUCCESS';
export const fetchFAILURE = 'fetchFAILURE';

export const addREQUEST = 'addREQUEST';
export const addSUCCESS = 'addSUCCESS';
export const addFAILURE = 'addFAILURE';

export const updateREQUEST = 'updateREQUEST';
export const updateSUCCESS = 'updateSUCCESS';
export const updateFAILURE = 'updateFAILURE';

export const removeREQUEST = 'removeREQUEST';
export const removeSUCCESS = 'removeSUCCESS';
export const removeFAILURE = 'removeFAILURE';

export const resetSUCCESS = 'resetSUCCESS';

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
        dispatch({ type: authFAILURE });
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
        dispatch({ type: fetchFAILURE });
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
        dispatch({ type: addFAILURE });
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
        dispatch({ type: updateFAILURE });
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
        dispatch({ type: removeFAILURE });
      });
  }

export const reset = {
  type: resetSUCCESS,
};
