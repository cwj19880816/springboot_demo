package com.cwj.springboot_demo.controller;

import com.cwj.springboot_demo.entity.User;
import com.cwj.springboot_demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/login")
    public String login(Model model, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        boolean flag = userService.loginVerify(new User(username, password));
        if (flag) {
            session.setAttribute("username",username);
            return "index";
        } else {
            model.addAttribute("loginerrormsg", "用户名或密码错误");
            return "login";
        }
    }

    @RequestMapping(value = "/register")
    public String register(HttpServletRequest request, HttpServletResponse response,HttpSession session) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        userService.registerUser(new User(username, password));
        session.setAttribute("username",username);
        return "register_success";
    }

    @RequestMapping(value = "/check")
    @ResponseBody
    public Map<String, Object> check(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("username");
        Map<String, Object> map = new HashMap<>();
        boolean flag = userService.checkName(username);
        if (flag) {
            map.put("result", "success");
        } else {
            map.put("result", "error");
        }
        return map;
    }
}
