package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author Huy Pham
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest implements Serializable {

    private String userProfileId;
    private String firstName;
    private String lastName;
    private String description;
    private String websiteLink;
    private String githubLink;
    private String position;
    private String company;
    private String avatar;
    private String userId;
}
