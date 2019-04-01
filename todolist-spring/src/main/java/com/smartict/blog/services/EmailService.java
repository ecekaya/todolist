package com.smartict.blog.services;

public interface EmailService {
    String sendMail(String to, String subject,String text);
}
