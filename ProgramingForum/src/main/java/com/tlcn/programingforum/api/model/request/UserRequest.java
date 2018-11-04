package com.tlcn.programingforum.api.model.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import java.util.Date;

/**
 * @author Huy Pham
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    private String userId;
    private String userName;
    private String password;
    private String confirmPassword;
    private String email;
    private String lang;
    private String setting;
}