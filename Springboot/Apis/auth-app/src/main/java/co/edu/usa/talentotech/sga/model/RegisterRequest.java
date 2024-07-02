package co.edu.usa.talentotech.sga.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
	String email;
    String password;
    String rol;
    String city; 
    String name;
}
