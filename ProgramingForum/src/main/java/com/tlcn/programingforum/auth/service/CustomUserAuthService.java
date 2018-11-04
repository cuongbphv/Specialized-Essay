package com.tlcn.programingforum.auth.service;

import com.tlcn.programingforum.auth.AuthUser;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author Huy Pham
 */
public interface CustomUserAuthService extends UserDetailsService {

    AuthUser loadUserByAccessToken(String token);
}
