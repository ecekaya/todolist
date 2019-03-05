package com.smartict.blog.services;

import com.smartict.blog.exceptions.UserNotFoundException;
import com.smartict.blog.models.User;

import java.util.List;
import java.util.Optional;


public interface UserService {

	Optional<User> findUser(Integer id) throws UserNotFoundException;
	User createUser(User user);
	User updateUser(User user);
	void delete(Integer id);
	List<User> findAll();
}
