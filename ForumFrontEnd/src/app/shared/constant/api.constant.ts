import {AppConfig} from './app-config.constant';

const BaseURL = {
  AUTH_API: '/auth',
  USER_API: '/user',
};

export const API = {
  // Auth API
  USER_LOGIN: BaseURL.AUTH_API + '/login',
  LOGOUT: BaseURL.AUTH_API + '/logout',
  // User API
  REGISTER_USER: BaseURL.USER_API + '/signup',
  GET_USER_PROFILE: BaseURL.AUTH_API + '/profile',
  AUTH_USER_PROFILE: '/auth/user',
  AUTH_USER_EMAIL: '/auth/check',

  GET_USER: BaseURL.USER_API + "/"

};
