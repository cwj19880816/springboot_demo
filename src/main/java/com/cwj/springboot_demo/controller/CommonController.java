package com.cwj.springboot_demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//不包含请求的普通页面跳转
@Controller
public class CommonController {
    @RequestMapping(value = "/commonForward")
    public String commonForward(HttpServletRequest request, HttpServletResponse response){
        String location=request.getParameter("location");
        return location;
    }
}
