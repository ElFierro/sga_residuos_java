package co.edu.usa.talentotech.sga.model;

import co.edu.usa.sga.models.Records;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@ToString

@JsonInclude(JsonInclude.Include.NON_NULL)

@Document(value = "users")
public class User extends Records<User> implements java.io.Serializable{
	private static final long serialVersionUID = 5L;
	@Id
	private String id;
	
	private String name;
	
	private String email;
	
	private String city;
	
	private String password;
	
	private String clientId;
	
	private String clientSecret;
	
    @CreatedDate
    private Date createdDate;
    
    @LastModifiedDate
    private Date lastModifiedDate;
    
    private String rol;
   
    private Boolean isEmailAvailable;
}
