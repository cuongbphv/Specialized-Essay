package com.tlcn.programingforum.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tlcn.programingforum.model.entity.key.FollowUserPK;
import com.tlcn.programingforum.model.entity.key.TagUserPK;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

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
@Table(name = "follow_user")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class FollowUser {

    @EmbeddedId
    FollowUserPK id;

    @CreatedDate
    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
}
