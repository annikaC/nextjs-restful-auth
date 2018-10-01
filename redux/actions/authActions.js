import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  // if (type !== 'signin' && type !== 'signup') {
  //   throw new Error('Wrong API call!');
  // }
  let base64 = new Buffer(email + ':' + password, 'utf8').toString('base64');
  return (dispatch) => {
    axios.get(`${API}/${type}`, { headers: { Authorization: 'Basic ' + base64 } })
      .then((response) => {
        setCookie('token', response.data.access_token);
        Router.push('/');
        dispatch({type: AUTHENTICATE, payload: response.data.access_token});
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({type: DEAUTHENTICATE});
  };
};


export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
