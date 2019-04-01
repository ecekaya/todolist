package com.smartict.blog.models;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="task")
@Data
public class Task extends BaseEntity{

	@Column(name="userId")
	private Integer userId;
	@Column(name="description")
	private String description;
	@Column(name="endDate")
	@Temporal(TemporalType.DATE)
	private Date endDate;
	@Column(name="status")
	private Boolean status;
	
}
