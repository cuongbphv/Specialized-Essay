import {AppConfig} from './app-config.constant';

const BaseURL = {
  AUTH_API: AppConfig.API_PATH + '/auth'
};

export const API = {
  // Auth API
  USER_LOGIN: BaseURL.AUTH_API + '/login',
  REGISTER_USER: BaseURL.AUTH_API + '/register',
  // User API
  LOGOUT: {path: '/auth/logout'},
  GET_USER_PROFILE: '/user/profile',
  AUTH_USER_PROFILE: '/auth/user'
};
