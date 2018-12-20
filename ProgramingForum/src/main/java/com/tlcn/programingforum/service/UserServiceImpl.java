package com.tlcn.programingforum.service;

import com.tlcn.programingforum.api.model.request.PagingRequestModel;
import com.tlcn.programingforum.api.model.response.UserResponse;
import com.tlcn.programingforum.model.entity.User;
import com.tlcn.programingforum.repository.UserRepository;
import com.tlcn.programingforum.repository.specification.ArticleSpecification;
import com.tlcn.programingforum.repository.specification.UserSpecification;
import com.tlcn.programingforum.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Huy Pham
 */
@Service
public class UserServiceImpl extends AbstractBaseService implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getActiveUserByUserId(String userId) {
        return userRepository.findByUserIdAndStatus(userId, Constant.Status.ACTIVE.getValue());
    }

    @Override
    public void deleteUsers(List<User> users) {
        for (User user : users) {
            userRepository.delete(user);
        }
    }

    @Override
    public void deleteUser(User user) {
        user.setStatus(Constant.Status.DELETE.getValue());
        userRepository.save(user);
    }


    @Override
    public User findByEmailAndStatus(String email, int status) {
        return userRepository.findByEmailAndStatus(email, status);
    }

    @Override
    public User findByUserNameAndStatus(String userName, int status) {
        return userRepository.findByUserNameAndStatus(userName, status);
    }

    @Override
    public Page<UserResponse> getListUserPaging(PagingRequestModel pagingRequestModel, String lang) {
        UserSpecification userSpec = new UserSpecification(pagingRequestModel.getSearchKey(),
                pagingRequestModel.getSortCase(), pagingRequestModel.isAscSort(),lang);
        PageRequest pageReq = new PageRequest((pagingRequestModel.getPageNumber() - 1), pagingRequestModel.getPageSize());
        //return userRepository.findAllPaging(userSpec, pageReq);
        return null;
    }

}
