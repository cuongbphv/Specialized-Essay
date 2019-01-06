package com.tlcn.programingforum.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.tlcn.programingforum.util.Constant;
import org.apache.tomcat.util.bcel.Const;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * @author Huy Pham
 */

@Service
public class SocialLoginServiceImpl implements SocialLoginService {

    @Value("${facebook.app-id}")
    private String FACEBOOK_APP_ID;

    @Value("${facebook.app-secret}")
    private String FACEBOOK_APP_SECRET;

    @Value("${google.app-id}")
    private String GOOGLE_APP_ID;

    @Override
    public boolean checkFacebookToken(String token, String userId) {

        try{

            HttpResponse<JsonNode> jsonResponse =
                    Unirest.get(Constant.CHECK_FACEBOOK_ACCESS_TOKEN_HEAD + FACEBOOK_APP_ID +
                            "%7C" + FACEBOOK_APP_SECRET + Constant.CHECK_FACEBOOK_ACCESS_TOKEN_TAIL + token)
                            .asJson();

            if(jsonResponse.getStatus() == 200){

                String responseBody = jsonResponse.getBody().toString();

                JSONObject result = new JSONObject(responseBody).getJSONObject("data");

                String appId = (String) result.get("app_id");
                String responseUserId = (String) result.get("user_id");

                if(appId.equals(FACEBOOK_APP_ID) && responseUserId.equals(userId)){
                    return true;
                }
            }
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return false;
    }

    @Override
    public boolean checkGoogleToken(String token, String userId) {

        try{

            HttpResponse<JsonNode> jsonResponse =
                    Unirest.get(Constant.CHECK_GOOGLE_ACCESS_TOKEN + token)
                            .asJson();

            if(jsonResponse.getStatus() == 200){

                String responseBody = jsonResponse.getBody().toString();

                JSONObject result = new JSONObject(responseBody);

                String appId = (String) result.get("issued_to");
                String responseUserId = (String) result.get("user_id");

                if(appId.equals(GOOGLE_APP_ID) && responseUserId.equals(userId)){
                    return true;
                }
            }
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return false;

    }
}
