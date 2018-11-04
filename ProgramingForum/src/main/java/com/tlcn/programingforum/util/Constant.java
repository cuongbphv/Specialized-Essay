
package com.tlcn.programingforum.util;

public interface Constant {


    /**
     * ****************************
     * define AIPs path
     */
    public static final String API_PREFIX = "/api/v1";
    public static final String WITHIN_ID = "/{id}";

    // auth APIs
    public static final String AUTH_API = API_PREFIX + "/auth";
    public static final String ADMIN_LOGIN_API = "/admin/login";
    public static final String ADMIN_GRANT_API = "/admin/grant/{code}";
    public static final String AUTH_ADMIN_INFO = "/admin";
    public static final String USER_LOGIN_API = "/login";
    public static final String LOGOUT_API = "/logout";
    public static final String AUTH_USER_INFO = "/user";
    public static final String REFRESH_TOKEN = "/refresh";
    public static final String UPDATE_USER = "/update";

    // Admin APIs
    public static final String ADMIN_API = API_PREFIX + "/admin";
    public static final String ADMIN_SETTING = "/setting";
    public static final String ADMIN_UPDATE_PASS = "/update_password";
    public static final String UPLOAD = API_PREFIX + "/upload";

    //User management
    public static final String USER_API = API_PREFIX + "/user";
    public static final String USER_LIST = "/list";
    public static final String USER_SETTING = "/setting";
    public static final String UPDATE_PASS = "/update_password";
    public static final String USER_UPDATE_PASS = "/user_update_password";

    // Request Content Type
    public static final String APPLICATION_JSON_CONTENT_TYPE = "application/json";
    public static final String APPLICATION_URL_ENCODED = "application/x-www-form-urlencoded";
    
    // Common header
    public static final String BOX_AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE = "Content-type";

    //Charset UTF
    public static final String CHARSET_UTF8 = "UTF-8";


    public static final int RANDOM_MIN = 100000;
    public static final int RANDOM_MAX = 999999;
    public static final int DEFAULT_EXPIRE_TIME = 3600000; // miliseconds (1 hour)
    public static final int MAX_EXPIRE_TIME = 86400000; // miliseconds (1 day)
    public static final String DEFAULT_EXPIRE_TIME_STR = "3600000"; // miliseconds (1 hour)
    public static final int SALT_LENGTH = 6;
    public static final String HEADER_TOKEN = "X-Access-Token";


    // Auth expire time
    public static final long DEFAULT_REMEMBER_LOGIN_MILISECONDS = 1296000000; // 15 days
    public static final long DEFAULT_SESSION_TIME_OUT = 1800000; // 30 minutes


    public enum Status{

        ACTIVE("ACTIVE", 1),
        DELETE("DELETE",0);

        private final String name;
        private final int value;

        private Status(String name, int value){
            this.name = name;
            this.value = value;
        }

        public String getName(){
            return  this.name;
        }

        public int getValue(){
            return this.value;
        }
    }


    public enum SystemRole {

        SYS_ADMIN("ADMIN", "Admin role"),
        USER("USER", "User role"),
        MODERATOR("MODERATOR", "Moderator");

        private final String name;
        private final String desc;

        ;

        private SystemRole(String name, String desc) {
            this.name = name;
            this.desc = desc;
        }

        public String getName() {
            return name;
        }

        public String getDesc() {
            return desc;
        }
    }

    public enum ParamError {
        ;

        private final String name;
        private final String desc;

        private ParamError(String name, String desc) {
            this.name = name;
            this.desc = desc;
        }

        public String getName() {
            return name;
        }

        public String getDesc() {
            return desc;
        }
    }


    public static enum ResetCodeType {

        FORGOT_PASS(0, "Forgot Pass"), CHANGE_EMAIL(1, "Change email");
        private final int value;
        private final String type;

        private ResetCodeType(int value, String type) {
            this.value = value;
            this.type = type;
        }

        public int getValue() {
            return value;
        }

        public String getType() {
            return type;
        }
    }

}
