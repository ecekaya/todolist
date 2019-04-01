package com.smartict.blog.dao;

import com.smartict.blog.models.Task;
import com.smartict.blog.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailRepository{

    void sendMail(String to, String subject, String text);
	
}
