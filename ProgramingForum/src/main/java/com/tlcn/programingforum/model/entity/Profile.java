package com.tlcn.programingforum.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name = "user_profile")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Profile {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.tlcn.programingforum.util.IDGeneratorUtil")
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
