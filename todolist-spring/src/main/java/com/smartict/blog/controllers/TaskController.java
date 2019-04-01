package com.smartict.blog.controllers;

import com.smartict.blog.apis.TaskControllerApi;
import com.smartict.blog.models.Task;
import com.smartict.blog.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(TaskControllerApi.taskController)
public class TaskController {

	@Autowired
	TaskService taskService;
	
	
	@PostMapping(TaskControllerApi.create)
	public Task create(@RequestBody Task task)
	{
		return taskService.createTask(task);
	}
	
	@PostMapping(TaskControllerApi.update)
	public Task update(@RequestBody Task task)
	{
		return taskService.updateTask(task);
	}
	
	@DeleteMapping(TaskControllerApi.delete)
	public void delete(@PathVariable("id") Integer id)
	{
		taskService.deleteTask(id);
	}
	
	@GetMapping(TaskControllerApi.find)
	public Optional<Task> getTask(@PathVariable("id") Integer id)
	{
		return taskService.getTask(id);
	}
	
	@GetMapping(TaskControllerApi.findUserTasks)
	public List<Task> findUserTasks(@PathVariable("userId") Integer userId)
	{
		return taskService.getTasks(userId);
	}
	
	@GetMapping(TaskControllerApi.findAll)
	public List<Task> getAllTasks()
	{
		return taskService.findAllByOrderByIdAsc();
	}
	
}
