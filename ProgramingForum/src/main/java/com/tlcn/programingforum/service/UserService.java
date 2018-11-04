package com.tlcn.programingforum.service;


import com.tlcn.programingforum.model.entity.User;

import java.util.List;

/**
 * @author Huy Pham
 */

public interface UserService {

    User saveUser(User user);

    User getActiveUserByUserId(String userId);

    void deleteUsers(List<User> users);

    void deleteUser(User user);

  //  Page<User> getListUserPaging(PagingRequestModel pagingRequestModel);

    User findByEmailAndStatus(String email, int status);

    User findByUserNameAndStatus(String userName, int status);

}
