package co.edu.usa.talentotech.sga.dto;

import co.edu.usa.sga.utilities.constans.ResponseMessages;
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
public class UserDTO {
	private String name;

	@NotNull(message = ResponseMessages.ERROR_EMAIL_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_EMAIL_REQUIRED)
	@Email
	private String email;
	
	@NotNull(message = ResponseMessages.ERROR_CITY_REQUIRED)
	@NotBlank(message = ResponseMessages.ERROR_CITY_REQUIRED)
	private String city;

	private String password;
	
	private String rol;
}
