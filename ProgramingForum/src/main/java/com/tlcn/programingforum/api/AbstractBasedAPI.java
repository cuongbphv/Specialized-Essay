
package com.tlcn.programingforum.api;


import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.api.response.ResponseUtil;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.auth.service.CustomUserAuthService;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.util.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Huy Pham
 */
public abstract class AbstractBasedAPI {

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected ResponseUtil responseUtil;


    @Autowired
    protected CustomUserAuthService customUserAuthService;


    public void validatePermission(AuthUser user, int role) {
        if (user == null) {
            throw new ApplicationException(APIStatus.ERR_ACCOUNT_INVALID);
        }
        if (user.getRole() > role) {
            throw new ApplicationException(APIStatus.ERR_FORBIDDEN);
        }
    }


    public AuthUser getAuthUserFromSession(HttpServletRequest request) {
        String authToken = request.getHeader(Constant.HEADER_TOKEN);
        // try to load session
        AuthUser user = customUserAuthService.loadUserByAccessToken(authToken);
        return user;
    }
}
