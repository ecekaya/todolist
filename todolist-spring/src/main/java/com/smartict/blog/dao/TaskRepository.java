package com.smartict.blog.dao;

import com.smartict.blog.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{

	@Query(value = "SELECT * FROM todolist.task WHERE user_id = ?1", nativeQuery = true)
    List<Task> getAllByUserId(Integer userId);
	
}
