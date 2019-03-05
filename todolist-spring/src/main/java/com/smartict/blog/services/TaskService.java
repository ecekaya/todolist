package com.smartict.blog.services;

import com.smartict.blog.models.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

	List<Task> getTasks(Integer userId);
	Optional<Task> getTask(Integer id);
	Task createTask(Task task);
	Task updateTask(Task task);
	void deleteTask(Integer id);
	List<Task> getAll();
}

