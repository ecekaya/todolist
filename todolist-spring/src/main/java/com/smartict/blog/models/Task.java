package com.smartict.blog.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="task")
@Data
public class Task extends BaseEntity{

	@Column
	private Integer UserId;
	@Column
	private String Description;
	@Column
	@Temporal(TemporalType.DATE)
	private Date CreateDate;
	@Column
	@Temporal(TemporalType.DATE)
	private Date EndDate;
	@Column
	private Integer Status;
	
}
