package com.tlcn.programingforum.auth;


import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.util.Constant;

/**
 *
 * @author Huy Pham
 */
public interface AuthUserFactory {

    AuthUser createAuthUser(User user);
}
