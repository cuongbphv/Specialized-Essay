package com.tlcn.programingforum.api.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Huy Pham
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagingRequestModel {

    private String searchKey;
    private String name;
    private int sortCase;
    private boolean ascSort;
    private int pageNumber;
    private int pageSize;
    private String lang;
}