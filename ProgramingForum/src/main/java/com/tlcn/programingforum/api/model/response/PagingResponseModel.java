package com.tlcn.programingforum.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * @author buiph on 20/12/2018
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagingResponseModel {
    private List<?> data;
    private int offset;
    private int numberOfElements;
    private long totalElements;
    private int totalPages;
}
