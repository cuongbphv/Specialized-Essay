
const BaseURL = {
  AUTH_API: '/auth',
  USER_API: '/user',
  PROFILE: '/profile',
  ARTICLE_API: '/article',
  TAG_API: '/tag',
  ARTICLE_INTERACT_API: '/interact',
  REPORT_ARTICLE_API: '/report',
  REPORT_COMMENT_API: '/report-comment',
  COMMENT_API: '/comment',
  AUTHOR_API: '/author'
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

  GET_USER: BaseURL.USER_API + "/",

  //Profile API
  GET_PROFILE: '/profile/',
  UPDATE_PROFILE: BaseURL.PROFILE,

  // Article Management
  CREATE_ARTICLE: BaseURL.ARTICLE_API,
  UPDATE_ARTICLE: BaseURL.ARTICLE_API,
  GET_ARTICLE: BaseURL.ARTICLE_API + "/",
  GET_LIST_ARTICLE: BaseURL.ARTICLE_API + "/list",
  VIEW_COUNT: BaseURL.ARTICLE_API + "/view",
  STATS_BY_ARTICLE: BaseURL.ARTICLE_API + "/stats",
  MARK_AS_RESOLVED: BaseURL.ARTICLE_API + "/resolved",
  GET_RELATED_ARTICLE: BaseURL.ARTICLE_API + "/related",
  ARTICLE_SAME_AUTHOR: BaseURL.ARTICLE_API + "/same-author",
  BOOKMARK_LIST: BaseURL.ARTICLE_API + "/bookmark",
  TRENDING_LIST: BaseURL.ARTICLE_API + "/trending",
  APPROVE: BaseURL.ARTICLE_API + "/approve",

  // Interact Management
  ADD_INTERACT: BaseURL.ARTICLE_INTERACT_API,
  GET_LIST_ARTICLE_INTERACT: BaseURL.ARTICLE_INTERACT_API,

  // Comment Management
  CRUD_COMMENT: BaseURL.COMMENT_API,
  LIST_COMMENT_IN_ARTICLE: BaseURL.COMMENT_API + "/list",

  // Report Article Management
  REPORT_ARTICLE: BaseURL.REPORT_ARTICLE_API,

  //Report Comment Management
  REPORT_COMMENT: BaseURL.REPORT_COMMENT_API,

  // Tag Management
  GET_MOST_TAG_IN_FORUM: BaseURL.TAG_API + "/most",
  MY_TAGS: BaseURL.TAG_API + "/my_tags",
  FOLLOW_TAG: BaseURL.TAG_API + "/follow",
  FOLLOW_STATUS: BaseURL.TAG_API + "/status",
  UNFOLLOW_TAG: BaseURL.TAG_API + "/unfollow",
  LIST_TAG_FOLLOWERS: BaseURL.TAG_API + "/followers",
  LIST_ARTICLE_BY_TYPE_AND_TAG_ID: BaseURL.TAG_API + "/list",
  TAG_INFORMATION: BaseURL.TAG_API + "/",

  // Author Management
  TOP_AUTHOR: BaseURL.AUTHOR_API + "/top"

};
