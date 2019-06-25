package com.cwj.springboot_demo.service;

import com.cwj.springboot_demo.entity.User;

public interface UserService {
    boolean loginVerify(User user);

    void registerUser(User user);

    boolean checkName(String username);
}
