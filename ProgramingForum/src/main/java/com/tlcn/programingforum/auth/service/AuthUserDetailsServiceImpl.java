package com.tlcn.programingforum.auth.service;

import com.google.gson.Gson;
import com.tlcn.programingforum.api.response.APIStatus;
import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.exception.ApplicationException;
import com.tlcn.programingforum.model.entity.Session;
import com.tlcn.programingforum.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * @author Huy Pham
 */
@Service
public class AuthUserDetailsServiceImpl implements CustomUserAuthService {

    Gson gson = new Gson();

    @Autowired
    UserSessionRepository userSessionRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) {
        // Not implement
        return null;
    }

    @Override
    public AuthUser loadUserByAccessToken(String token) {
        Session session = userSessionRepository.findByTokenId(token);
        if (session != null) {
            if (session.getSessionData() != null && !"".equals(session.getSessionData())) {
                AuthUser authUser = gson.fromJson(session.getSessionData(), AuthUser.class);
                return authUser;
            } else {
                throw new ApplicationException(APIStatus.ERR_SESSION_DATA_INVALID);
            }
        } else {
            throw new ApplicationException(APIStatus.ERR_SESSION_NOT_FOUND);
        }

    }
}
