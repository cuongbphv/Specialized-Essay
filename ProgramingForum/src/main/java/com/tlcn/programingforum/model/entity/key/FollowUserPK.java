package com.tlcn.programingforum.model.entity.key;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author Huy Pham
 */

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowUserPK implements Serializable {
    @Column(name = "user_id")
    private String userId;
    @Column(name = "follow_user_id")
    private String followUserId;
}
