package com.smartict.blog.controllers;

import com.smartict.blog.links.UserControllerApi;
import com.smartict.blog.models.Task;
import com.smartict.blog.models.User;
import com.smartict.blog.services.TaskService;
import com.smartict.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(UserControllerApi.userController)
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    TaskService taskService;

    @PostMapping(UserControllerApi.create)
    public User create(@RequestBody User user) {
        return userService.createUser(user);
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


}
