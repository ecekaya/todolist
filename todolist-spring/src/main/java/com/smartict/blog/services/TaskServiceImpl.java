package com.smartict.blog.services;

import com.smartict.blog.dao.TaskRepository;
import com.smartict.blog.dao.UserRepository;
import com.smartict.blog.exceptions.UserNotFoundException;
import com.smartict.blog.models.Task;
import com.smartict.blog.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

	UserRepository userRepository;
	@Autowired
	TaskRepository taskRepository;

	@Autowired
	public void setTaskRepository(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public Task createTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	@Transactional
	public Task updateTask(Task task) {
		return taskRepository.save(task);

	}

	@Override
	@Transactional
	public List<Task> getTasks(Integer userId) {
		Optional<User> user=  userRepository.findById(userId);
		if(user == null) throw new UserNotFoundException("Kullanıcı Bulunamadı! UserId= " + userId);
		else return taskRepository.getAllByUserId(userId);
	}

	@Override
	@Transactional
	public void deleteTask(Integer id) {
		taskRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Optional<Task> getTask(Integer id) {
		return taskRepository.findById(id);
	}

	@Override
	@Transactional
	public List<Task> findAllByOrderByIdAsc() {
		return taskRepository.findAll();
	}



}
