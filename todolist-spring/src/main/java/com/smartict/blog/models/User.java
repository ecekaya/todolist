package com.smartict.blog.models;

import lombok.Data;

import javax.persistence.*;
@Entity
@Table(name="user")
@Data
public class User extends BaseEntity{

	@Column
	private String Surname;
	@Column
	private String Email;
	@Column
	private String Username;
	@Column
	private String Password;
	
}
