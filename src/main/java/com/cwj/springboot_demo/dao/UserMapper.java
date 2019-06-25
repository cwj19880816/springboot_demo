package com.cwj.springboot_demo.dao;

import com.cwj.springboot_demo.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    @Select("select * from t_user where username=#{username} and password=#{password}")
    List<User> selectUsersByNameAndPwd(User user);

    @Insert("insert into t_user(username,password) values(#{username},#{password})")
    void insertUser(User user);

    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
    })
    @Select("select * from t_user where username=#{username}")
    List<User> selectUsersByName(String username);
}
