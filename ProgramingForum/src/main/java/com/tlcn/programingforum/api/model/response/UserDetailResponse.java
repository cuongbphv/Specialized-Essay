package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * @author buiph on 14/11/2018
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Date createDate;
    private Date lastActivity;
    private String setting;
    private String role;
}
