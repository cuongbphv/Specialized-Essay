
package com.tlcn.programingforum.api.response;

public enum APIStatus {

    OK(200, "OK"),
    NO_RESULT(201, "No more result."),
    //////////////////
    // CLIENT SIDE  //
    //////////////////
    ERR_BAD_REQUEST(400, "Bad request"),
    ERR_UNAUTHORIZED(401, "Unauthorized or Access Token is expired"),
    ERR_FORBIDDEN(403, "Forbidden! Access denied"),
    ERR_BAD_PARAMS(406, "Bad parameters"),
    ERR_ALREADY_EXISTED(407, "Already exsited."),
    ERR_EMAIL_ALREADY_EXISTED(408, "Email Already exsited."),
    //////////////////
    // SERVER SIDE  //
    //////////////////
    ERR_INTERNAL_SERVER(500, "Internal Server Error"),
    ERR_CREATE_MODEL(501, "Create model error"),

    //////////////////
    // SESSION SIDE //
    //////////////////
    ERR_TOKEN_NOT_FOUND(600, "Access token not found"),
    ERR_INVALID_TOKEN(601, "Access token is invalid"),
    ERR_TOKEN_EXPIRED(602, "Access token is expired"),
    ERR_SESSION_DATA_INVALID(603, "Invalid session data"),
    ERR_SESSION_NOT_FOUND(604, "Session not found"),
    ERR_ACCOUNT_INVALID(605, "Invalid account"),
    ERR_CREATE_USER_SESSION(606, "Create User Session fail"),
    ERR_CREATE_ADMIN_SESSION(607, "Create Admin Session fail"),
    ERR_BOX_TOKEN_NOT_FOUND(608, "Box Access token not found"),

    //////////////////
    // DATABASE SIDE//
    //////////////////
    ERR_INCORRECT_MODEL_DATA(700, "Incorrect model data"),
    ERR_USER_NOT_FOUND(701, "User not found."),
    ERR_PASSWORD_NOT_MATCH(702, "Password doesn't match"),
    ERR_TOKEN_NOT_MATCH(702, "Token doesn't match"),
    ERR_EMAIL_ALREADY_EXISTS(703, "Email already exists"),
    ERR_CREATE_USER(704, "Create User fail"),
    ERR_EMAIL_INVALID(705, "Email is invalid"),
    ERR_INVALID_PARAM(706, "Param is invalid"),
    ERR_EXIST_USER_NAME(707, "User Name already exists"),
    ERR_UPDATE_USER(708, "Update User fail"),
    ERR_FOLDER_NOT_FOUND(709, "Folder not found"),
    ERR_PROFILE_NOT_FOUND(710, "Profile not found"),
    ERR_OLD_PASS(717, "Old password incorect"),

    //Profile
    ERR_USER_PROFILE_NOT_FOUND(800, "User Profile not found"),

    //POST
    ERR_ARTICLE_NOT_FOUND(900, "Article not found");

    private final int code;
    private final String description;

    private APIStatus(int s, String v) {
        code = s;
        description = v;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
