package co.edu.usa.talentotech.sga.model;


import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import co.edu.usa.sga.models.Records;
import co.edu.usa.sga.utilities.constans.ResponseMessages;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@ToString

@JsonInclude(JsonInclude.Include.NON_NULL)

@Document(value = "waste")
public class Waste extends Records<Waste> implements java.io.Serializable{
	private static final long serialVersionUID = 5L;
	@Id
	private String id;
	
	@NotNull(message = ResponseMessages.ERROR_TYPE_WASTE_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_TYPE_WASTE_REQUIRED)
	private String typeWaste;
	
	@NotNull(message = ResponseMessages.ERROR_CLASSIFICATION_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_CLASSIFICATION_REQUIRED)
	private String classification;
	
	@NotNull(message = ResponseMessages.ERROR_WEIGHT_REQUIRED)
	@DecimalMin(value = "0.0", message = ResponseMessages.ERROR_WEIGHT_POSITIVE)
	private Double weight;
	
	@NotNull(message = ResponseMessages.ERROR_ROUTE_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_ROUTE_REQUIRED)
	private String route;
	
	@NotNull(message = ResponseMessages.ERROR_EMAIL_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_EMAIL_REQUIRED)
	@Email
	private String email;
	
	@CreatedDate
	private Date dateAdmission;
}
