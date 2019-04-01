package com.smartict.blog.controllers;

import com.smartict.blog.apis.LoginControllerApi;
import com.smartict.blog.apis.UserControllerApi;
import com.smartict.blog.models.User;
import com.smartict.blog.services.EmailService;
import com.smartict.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(LoginControllerApi.auth)
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping(LoginControllerApi.signup)
    public User create(@RequestBody User user) {
        return new UserController().create(user);
    }

    @GetMapping(LoginControllerApi.login)
    public User login(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userService.findByUsername(username,password);
    }
}
