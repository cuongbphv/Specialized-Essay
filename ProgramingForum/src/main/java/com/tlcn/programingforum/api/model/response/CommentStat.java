package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author buiph on 01/01/2019
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentStat {
    private int numOfReply;
    private int numOfHeart;
    private boolean rightAnswer;
}
