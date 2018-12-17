package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.TagArticle;
import com.tlcn.programingforum.repository.TagArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author buiph on 16/12/2018
 */
@Service
public class TagArticleServiceImpl implements TagArticleService {

    @Autowired
    TagArticleRepository tagArticleRepository;

    @Override
    public TagArticle saveTagArticle(TagArticle tagArticle) {
        return tagArticleRepository.save(tagArticle);
    }
}
