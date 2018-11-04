package com.tlcn.programingforum.model.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.util.Date;

/**
 * @author Huy Pham
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class User {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.tlcn.programingforum.util.IDGeneratorUtil")
    private String userId;
    private String userName;

    @JsonIgnore
    private String passwordHash;
    @JsonIgnore
    private String salt;

    private String email;
    private String lang;

    @CreatedDate
    @Column(name = "create_date", nullable = true)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date createDate;

    @LastModifiedDate
    @Column(name = "last_activity", nullable = true)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date lastActivity;

    private int status;
    private String setting;
    private String role;
}
