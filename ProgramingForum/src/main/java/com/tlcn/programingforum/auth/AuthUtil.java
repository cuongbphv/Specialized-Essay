package com.tlcn.programingforum.auth;

import org.jboss.aerogear.security.otp.Totp;
import org.jboss.aerogear.security.otp.api.Base32;

import java.util.Random;
import java.util.UUID;

/**
 *
 * @author Huy Pham
 */
public class AuthUtil {

    public static String generateRandomNumber(int charLength) {
        return String.valueOf(charLength < 1 ? 0 : new Random().nextInt((9 * (int) Math.pow(10, charLength - 1)) - 1) + (int) Math.pow(10, charLength - 1));
    }

    public static String generateInvitationCode() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static String generateOneTimePassword() {
        String secret = Base32.random();
        return generateOneTimePassword(secret);
    }

    public static String generateOneTimePassword(String secret) {
        Totp totp = new Totp(secret);
        return totp.now();
    }
}
