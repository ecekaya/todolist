package com.smartict.blog.controllers;

import com.smartict.blog.apis.LoginControllerApi;
import com.smartict.blog.apis.UserControllerApi;
import com.smartict.blog.models.Task;
import com.smartict.blog.models.User;
import com.smartict.blog.services.EmailService;
import com.smartict.blog.services.TaskService;
import com.smartict.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping(UserControllerApi.userController)
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    TaskService taskService;
    @Autowired
    EmailService emailService;


    @PostMapping(UserControllerApi.create)
    public User create(@RequestBody User user) {
        UUID uuid = UUID.randomUUID();
        user.setTokenId(uuid.toString());
        User userNew = userService.createUser(user);
        String text = "To confirm your account, please click here: " + UserControllerApi.url + UserControllerApi.userController
                + UserControllerApi.confirmUser + "?token=" + user.getTokenId();
        emailService.sendMail(userNew.getEmail(), "Todo List", text);

        return userNew;
    }

    @PostMapping(UserControllerApi.update)
    public User update(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping(UserControllerApi.delete)
    public void delete(@PathVariable("id") Integer id) {
        List<Task> tasks = taskService.getTasks(id);
        tasks.forEach(task -> taskService.deleteTask(task.getId()));
        userService.delete(id);
    }

    @GetMapping(UserControllerApi.find)
    public Optional<User> find(@PathVariable("id") Integer id) {
        return userService.findUser(id);
    }

    @GetMapping(UserControllerApi.findAll)
    public List<User> findAll() {
        return userService.findAll();
    }

    @PostMapping(UserControllerApi.confirmUser)
    public User confirm(@RequestParam("token") String token) {

        User user = userService.findByTokenId(token);
        user.setIsEnabled(true);
        user.setLastModifiedDate(new Date());
        userService.updateUser(user);
        return user;
    }
}

