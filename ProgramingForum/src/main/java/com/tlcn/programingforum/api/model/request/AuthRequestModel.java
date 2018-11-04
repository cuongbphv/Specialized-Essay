package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Huy Pham
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestModel {

    // It can be user_name, email, id, etc
    public String account;
    public String passwordHash;
    public boolean keepLogin;
}