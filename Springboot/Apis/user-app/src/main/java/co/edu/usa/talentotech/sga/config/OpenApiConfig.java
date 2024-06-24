package co.edu.usa.talentotech.sga.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
	info = @Info(
            title = "Microservicio para la administración de usuarios",
            description = "Este microservicio se encarga de gestionar y registrar todos los datos de los usuarios",
            version = "1.0"
           
    )
)
public class OpenApiConfig {

}
