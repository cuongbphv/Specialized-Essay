
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
  LIST_USER: BaseURL.USER_API + "/list",
  LIST_BANNED_USER: BaseURL.USER_API + "/list/banned",
  GRANT_USER_ACCESS: BaseURL.USER_API + "/grant/",

  //Profile API
  GET_PROFILE: '/profile/',
  UPDATE_PROFILE: BaseURL.PROFILE,

  // Article Management
  CREATE_ARTICLE: BaseURL.ARTICLE_API,
  UPDATE_ARTICLE: BaseURL.ARTICLE_API,
  GET_ARTICLE: BaseURL.ARTICLE_API + "/",
  GET_LIST_ARTICLE: BaseURL.ARTICLE_API + "/list",
  GET_LIST_UNAPPROVED_ARTICLE: BaseURL.ARTICLE_API + "/list/unapproved",
  GET_REPORTED_LIST_ARTICLE: BaseURL.ARTICLE_API + "/list/reported",
  VIEW_COUNT: BaseURL.ARTICLE_API + "/view",
  STATS_BY_ARTICLE: BaseURL.ARTICLE_API + "/stats",
  MARK_AS_RESOLVED: BaseURL.ARTICLE_API + "/resolved",
  GET_RELATED_ARTICLE: BaseURL.ARTICLE_API + "/related",
  ARTICLE_SAME_AUTHOR: BaseURL.ARTICLE_API + "/same-author",
  BOOKMARK_LIST: BaseURL.ARTICLE_API + "/bookmark",
  TRENDING_LIST: BaseURL.ARTICLE_API + "/trending",
  APPROVE: BaseURL.ARTICLE_API + "/approve",
  MY_ARTICLE: BaseURL.ARTICLE_API + "/my-article",

  // Interact Management
  ADD_INTERACT: BaseURL.ARTICLE_INTERACT_API,
  GET_LIST_ARTICLE_INTERACT: BaseURL.ARTICLE_INTERACT_API,

  // Comment Management
  CRUD_COMMENT: BaseURL.COMMENT_API,
  LIST_COMMENT_IN_ARTICLE: BaseURL.COMMENT_API + "/list",
  COMMENT_INTERACT: BaseURL.COMMENT_API +"/interact",
  MY_COMMENT: BaseURL.COMMENT_API +"/my-comment",
  STAT_BY_COMMENT_ID: BaseURL.COMMENT_API +"/stats",

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
  LIST_TAG_DETAIL: BaseURL.TAG_API + "/list-detail",
  LIST_BANNED_TAG: BaseURL.TAG_API + "/list/banned",
  TAG_INFORMATION: BaseURL.TAG_API + "/",
  TAG_URL: BaseURL.TAG_API,
  ALL_TAGS: BaseURL.TAG_API + "/all",

  // Author Management
  TOP_AUTHOR: BaseURL.AUTHOR_API + "/top",

  //Follow
  FOLLOW_USER: BaseURL.USER_API + "/follow/",
  LIST_FOLLOW_USER: BaseURL.USER_API + "/follow/list/",
  LIST_FOLLOW_BY_OTHER: BaseURL.USER_API + "/follow/list-followed/"

};
