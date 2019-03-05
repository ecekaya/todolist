package com.smartict.blog.services;

import com.smartict.blog.dao.UserRepository;
import com.smartict.blog.exceptions.UserNotFoundException;
import com.smartict.blog.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	UserRepository userRepository;	
	
	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public Optional<User> findUser(Integer id) throws UserNotFoundException {
	Optional<User> user =  userRepository.findById(id);
		if(user == null) throw new UserNotFoundException("Kullanıcı Bulunamadı! UserId= " + id);
		return user;
	}

	@Override
	public User createUser(User user) {
		 return userRepository.save(user);
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public void delete(Integer id) {
		userRepository.deleteById(id);
		
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}
	

}
