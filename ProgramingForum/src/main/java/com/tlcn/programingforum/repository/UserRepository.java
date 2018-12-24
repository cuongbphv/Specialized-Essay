package com.tlcn.programingforum.repository;

import com.tlcn.programingforum.api.model.response.UserResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.model.entity.Profile;
import com.tlcn.programingforum.repository.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Huy Pham
 */

@Repository
@Transactional
public interface UserRepository extends PagingAndSortingRepository<User,String> {

    User findByUserIdAndStatus(String userId, int status);

    User findByEmailAndStatus(String email, int status);

    User findByUserNameAndStatus(String userName, int status);

    User findByUserId(String userId);

    @Query(value = "SELECT a.user_id, up.first_name, up.last_name, " +
            "sum(art.rating) as rating, sum(art.bookmark) as bookmark, " +
            "sum(art.share) as share, sum(a.view_count) as view_count " +
            "FROM article a, article_interact art, user u, user_profile up " +
            "where a.article_id = art.article_id " +
            "and a.user_id = u.user_id " +
            "and u.user_id = up.user_id " +
            "group by a.user_id " +
            "having sum(art.rating) > 0 " +
            "order by (rating*5 + bookmark*2 + view_count*2 + share*1) " +
            "desc LIMIT 5", nativeQuery = true)
    List<Object[]> getTopAuthors();


    @Query(value = "SELECT new com.tlcn.programingforum.api.model.response.UserResponse (u.userId, u.userName, u" +
            ".email, u.phone, u.lang, u.setting, u.createDate, u.lastActivity," +
            "u.role,up.userProfileId, up.firstName, up.lastName, " +
            "up.avatar, up.description, up.websiteLink,up.githubLink, up.position, up.company) " +
            "FROM User u , Profile up " +
            "WHERE u.userId = up.userId AND (u.email LIKE :search or u.userName like :search " +
            "or (u.lang = 'en' AND LOWER(CONCAT(up.firstName, ' ',up.lastName)) like :search) " +
            "or (u.lang = 'vi' AND LOWER(CONCAT(up.lastName, ' ',up.firstName)) like :search)) ")
    Page<UserResponse> findAllPaging(@Param("search") String search, Pageable pageable);
}
