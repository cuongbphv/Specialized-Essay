package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.auth.AuthUserFactory;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.entity.Session;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.repository.UserRepository;
import com.tlcn.programingforum.repository.UserSessionRepository;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author Huy Pham
 */
@Component
public class AuthServiceImp extends AbstractBaseService implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSessionRepository userSessionRepository;

    @Autowired
    AuthUserFactory authUserFactory;

    @Override
    public Session createUserToken(User user, boolean keepLogin) {
        try {
            Session userSession = new Session();
            userSession.setUserId(user.getUserId());
            Date currentDate = new Date();
            userSession.setLoginDate(currentDate);
            Date expirationDate = keepLogin ? new Date(currentDate.getTime() + Constant.DEFAULT_REMEMBER_LOGIN_MILISECONDS) : new Date(currentDate.getTime() + Constant.DEFAULT_SESSION_TIME_OUT);
            userSession.setExpirationDate(expirationDate);
            AuthUser authUser = authUserFactory.createAuthUser(user);
            // Set authUser to session data...
            userSession.setSessionData(gson.toJson(authUser));
            userSessionRepository.save(userSession);
            return userSession;
        } catch (Exception e) {
            LOGGER.error("Error create User token ", e);
            throw new ApplicationException(APIStatus.ERR_CREATE_MODEL);
        }
    }

    @Override
    public Session getUserByTokenId(String id) {
        return userSessionRepository.findByTokenId(id);
    }

    @Override
    public void deleteUserToken(Session userToken) {
        userSessionRepository.delete(userToken);
    }

    @Override
    public User getUserByIdAndStatus(String userId, int status) {
        return userRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    public void updateAuthenUser(AuthUser authUser, User user, String tokenId) {
        Session userSession = userSessionRepository.findByTokenId(tokenId);
        if (userSession != null) {
            authUser.setLang(user.getLang());
            userSession.setSessionData(gson.toJson(authUser));
            userSessionRepository.save(userSession);
        }
    }

    @Override
    public User getUserByEmailAndStatus(String email, int status) {
        return userRepository.findByEmailAndStatus(email, status);
    }

    @Override
    public User getUserByUserNameAndStatus(String account, int status) {
        return userRepository.findByUserNameAndStatus(account, status);
    }

}
