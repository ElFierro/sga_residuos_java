package co.edu.usa.talentotech.sga.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import co.edu.usa.sga.models.Records;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)

@Document(value = "resources")
public class Resources extends Records<Resources> implements java.io.Serializable{
	private static final long serialVersionUID = 5L;
	@Id
	private String id;
	
	private String route;
	
	private String classification;
	
	private String type;
	
	private String code;
	
	 private String classificationGroup;
}
