package com.tlcn.programingforum.model.entity.key;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author buiph on 19/12/2018
 */

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUserPK implements Serializable {
    @Column(name = "comment_id")
    private String commentId;
    @Column(name = "user_id")
    private String userId;
}
