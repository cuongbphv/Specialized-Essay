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
public class NotificationPK implements Serializable {
    @Column(name = "from_user_id")
    private String fromUserId;
    @Column(name = "to_user_id")
    private String toUserId;
}