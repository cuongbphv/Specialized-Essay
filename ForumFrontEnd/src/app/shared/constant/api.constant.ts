
const BaseURL = {
  AUTH_API: '/auth',
  USER_API: '/user',
};

export const API = {
  // Auth API
  USER_LOGIN: BaseURL.AUTH_API + '/login',
  USER_SOCIAL_LOGIN: BaseURL.AUTH_API + '/social_login',
  LOGOUT: BaseURL.AUTH_API + '/logout',
  // User API
  REGISTER_USER: BaseURL.USER_API + '/signup',
  USER_DETAIL: BaseURL.USER_API + '/detail',
  GET_USER_PROFILE: BaseURL.AUTH_API + '/profile',
  AUTH_USER_PROFILE: '/auth/user',
  AUTH_USER_EMAIL: '/auth/check',

  GET_USER: BaseURL.USER_API + "/"

};
