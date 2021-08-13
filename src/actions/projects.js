import axios from 'axios';
import { url } from 'routes';

export const fetchREQUEST = 'fetchREQUEST';
export const fetchSUCCESS = 'fetchSUCCESS';

export const addREQUEST = 'addREQUEST';
export const addSUCCESS = 'addSUCCESS';

export const resetSUCCESS = 'resetSUCCESS';

export const fetch = () =>
  (dispatch, getState) => {
    dispatch({ type: fetchREQUEST });
    return axios({
      method: "GET",
      withCredentials: true,
      url: url + '/projects',
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
      url: url + '/projects',
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
