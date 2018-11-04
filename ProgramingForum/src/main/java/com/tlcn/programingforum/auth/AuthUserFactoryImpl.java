package com.tlcn.programingforum.auth;

import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.util.Constant;
import org.springframework.stereotype.Service;

/**
 *
 * @author Huy Pham
 */
@Service
public class AuthUserFactoryImpl implements AuthUserFactory {

    @Override
    public AuthUser createAuthUser(User user) {
        return new AuthUser(
                user.getUserId(),
                user.getUserName(),
                user.getPasswordHash(),
                user.getRole(),
                user.getStatus() == Constant.Status.ACTIVE.getValue(),
                user.getLang()
        );
    }
}
