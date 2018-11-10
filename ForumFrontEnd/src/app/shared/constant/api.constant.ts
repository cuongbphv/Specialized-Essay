import {AppConfig} from './app-config.constant';

const BaseURL = {
  AUTH_API: AppConfig.API_PATH + '/auth',
  USER_API: AppConfig.API_PATH + '/user'
};

export const API = {
  // Auth API
  USER_LOGIN: BaseURL.AUTH_API + '/login',
  LOGOUT: BaseURL.AUTH_API + '/logout',
  // User API
  REGISTER_USER: BaseURL.AUTH_API + '/signup',
  GET_USER_PROFILE: BaseURL.AUTH_API + '/profile',
  AUTH_USER_PROFILE: '/auth/user'
};
