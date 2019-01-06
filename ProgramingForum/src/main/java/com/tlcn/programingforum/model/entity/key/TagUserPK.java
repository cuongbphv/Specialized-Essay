package com.tlcn.programingforum.model.entity.key;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author buiph on 21/12/2018
 */

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagUserPK implements Serializable {
    @Column(name = "tag_id")
    private String tagId;
    @Column(name = "user_id")
    private String userId;
}
