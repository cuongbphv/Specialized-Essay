package com.tlcn.programingforum.service;


import com.tlcn.programingforum.auth.AuthUser;
import com.tlcn.programingforum.model.entity.Session;
import com.tlcn.programingforum.model.entity.User;

/**
 * @author Huy Pham
 */
public interface AuthService {

    public User getUserByEmailAndStatus(String email, int status);

    public User getUserByIdAndStatus(String userId, int status);

    public Session createUserToken(User user, boolean keepLogin);

    public Session getUserByTokenId(String id);

    public void deleteUserToken(Session userToken);

    public void updateAuthenUser(AuthUser authUser, User user, String tokenId);

    public User getUserByUserNameAndStatus(String account, int status);

}
