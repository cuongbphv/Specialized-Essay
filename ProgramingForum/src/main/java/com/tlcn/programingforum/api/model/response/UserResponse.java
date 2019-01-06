package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author Huy Pham
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    //user section
    private String userId;
    private String userName;
    private String email;
    private String phone;
    private String lang;
    private String setting;
    private Date createDate;
    private Date lastActivity;
    private int role;
    private int status;

    //profile section
    private String userProfileId;
    private String firstName;
    private String lastName;
    private String avatar;
    private String description;
    private String websiteLink;
    private String githubLink;
    private String position;
    private String company;
}
