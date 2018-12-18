package com.tlcn.programingforum.service;

import com.tlcn.programingforum.model.entity.ArticleInteract;
import com.tlcn.programingforum.repository.ArticleInteractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author buiph on 18/12/2018
 */

@Service
public class ArticleInteractServiceImpl implements ArticleInteractService {

    @Autowired
    ArticleInteractRepository articleInteractRepository;

    @Override
    public ArticleInteract saveArticleInteract(ArticleInteract articleInteract) {
        return articleInteractRepository.save(articleInteract);
    }

    @Override
    public ArticleInteract findByArticleIdAndUserId(String articleId, String userId) {
        return articleInteractRepository.findByIdArticleIdAndIdUserId(articleId, userId);
    }

    @Override
    public List<ArticleInteract> findByArticleId(String articleId) {
        return articleInteractRepository.findByIdArticleId(articleId);
    }
}
