import {AppConfig} from './app-config.constant';

export const API = {
  // User API
  USER_LOGIN: AppConfig.API_PATH + '/auth/login',
  LOGOUT: {path: '/auth/logout'},
  GET_USER_PROFILE: {path: '/user/profile', method: 'GET'},
  AUTH_USER_PROFILE: {path: '/auth/user', method: 'GET'}
};
