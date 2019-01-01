package com.tlcn.programingforum.api.model.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Huy Pham
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    //user section
    private String userId;
    private String userName;
    private String passwordHash;
    private String email;
    private String phone;
    private String lang;
    private String setting;

    //profile section
    private String userProfileId;
    private String firstName;
    private String lastName;
    @JsonIgnore
    private MultipartFile avatar;
    private String avatarUrl;
    private String description;
    private String websiteLink;
    private String githubLink;
    private String position;
    private String company;

    // follow tag id
    private List<String> tagIds;
}