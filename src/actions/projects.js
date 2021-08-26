import axios from 'axios';
import { url } from 'routes';

export const proFETCH = 'proFETCH';
export const proADD = 'proADD';
export const proUPDATE = 'proUPDATE';
export const proREMOVE = 'proREMOVE';
export const RESET = 'RESET';

export const proFetch = () =>
  (dispatch, getState) => {
    return axios({
      method: "GET",
      withCredentials: true,
      url: url + '/projects',
      data: { params: { user: getState().user } },
    })
      .then(({ data }) => {
        dispatch({
          type: proFETCH,
          payload: { data }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const proAdd = (content) =>
  (dispatch, getState) => {
    return axios({
      method: "POST",
      withCredentials: true,
      url: url + '/projects',
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: proADD,
          payload: { data },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  };

export const proUpdate = (content, _id) =>
  (dispatch, getState) => {
    return axios({
      method: "PUT",
      withCredentials: true,
      url: url + '/projects/' + _id,
      data: { userId: getState().user, ...content },
    })
      .then(({ data }) => {
        dispatch({
          type: proUPDATE,
          payload: { data, _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }

export const proRemove = (_id) =>
  (dispatch) => {
    return axios({
      method: "DELETE",
      withCredentials: true,
      url: url + '/projects/' + _id,
    })
      .then(() => {
        dispatch({
          type: proREMOVE,
          payload: { _id },
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: RESET });
        //window.location.reload();
      });
  }
