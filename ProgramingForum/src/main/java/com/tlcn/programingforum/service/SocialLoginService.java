package com.tlcn.programingforum.service;

/**
 * @author Huy Pham
 */


public interface SocialLoginService {

    boolean checkFacebookToken(String token, String userId);

    boolean checkGoogleToken(String token, String userId);
}
