package com.smartict.blog.models;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User extends BaseEntity {

    @Column(name = "tokenId")
    private String tokenId;
    @Column(name = "surname")
    private String surname;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "isEnabled")
    private Boolean isEnabled = false;

//    public User(String name, String username, String email, String password) {
//    }
}
