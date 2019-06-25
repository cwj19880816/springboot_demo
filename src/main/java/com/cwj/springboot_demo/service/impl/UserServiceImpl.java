package com.cwj.springboot_demo.service.impl;

import com.cwj.springboot_demo.dao.UserMapper;
import com.cwj.springboot_demo.entity.User;
import com.cwj.springboot_demo.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public boolean loginVerify(User user) {
        List<User> users = userMapper.selectUsersByNameAndPwd(user);
        if (users.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void registerUser(User user) {
        userMapper.insertUser(user);
    }

    @Override
    public boolean checkName(String username) {
        List<User> users = userMapper.selectUsersByName(username);
        if (users.size() > 0) {
            return false;
        } else {
            return true;
        }
    }
}
