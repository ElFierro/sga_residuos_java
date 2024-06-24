package co.edu.usa.talentotech.sga.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import co.edu.usa.sga.models.MultipleResponse;
import co.edu.usa.sga.models.ResponseDetails;
import co.edu.usa.sga.models.SingleResponse;
import co.edu.usa.talentotech.sga.dto.UserDTO;
import co.edu.usa.talentotech.sga.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;

@Tag(name = "User", description = "Administracion de usuarios")
public interface UserControllerApi {

    @Operation(summary = "Crear un nuevo usuario",
    		   description = "Crea un usuario donde los valores del correo electronico, clientId y clientSecret deben ser valores unicos "
    		   		+ "(es decir no estar registrado en el sistema). El id se genera automaticamente por lo que no es necesario "
    		   		+ "enviarlo en el cuerpo del mensaje, adicionalmente el correo debe tener un formato correcto. Este microservicio"
    		   		+ " encrypta la contraseña y valida que no se envien algunos valores nulos o vacios."
    		   	)
    
    @RequestBody(required = true,
    content = @Content( 
    			examples = {
    			 @ExampleObject(value = "{\"name\": \"Carlos Beltran\","
           						+ "\"email\": \"CarlosBeltran@gmail.com\","
           						+ "\"city\": \"Bogota\","
           						+ "\"rol\": \"Usuario\","
           						+ "\"password\": \"12345xse\"}")}))
    
    @ApiResponses(value = { 
        	@ApiResponse(responseCode = "200", description = "El usuario se creo exitosamente.",
        		content = { 
        			@Content(mediaType = "*/*",examples = {
                       @ExampleObject( 
                    		   value = "{\"data\" : "
	                       				+ "{\"id\": \"66495f42101be45fce9411e6\","
	                       				+ "\"name\": \"Carlos Beltran\","
	                       				+ "\"email\": \"CarlosBeltran@gmail.com\","
	                       				+ "\"city\": \"Bogota\","
	                       				+ "\"password\": \"$2a$10$sCLO2rGzBiVnwQRfcJfkH.QCAdOhVcmxpWraLP5WmBUrdrzKgHPm.\","
	                       				+ "\"rol\": \"2\","
	                       				+ "\"createdDate\": \"2024-05-19T02:09:06.205+00:00\","
	                       				+ "\"lastModifiedDate\": \"2024-05-19T02:09:06.205+00:00\""
	                       				+ "},\"responseDetails\" : "
	                       					+ "{\"code\": \"200\","
	                       					+ "\"message\": \"El usuario se creo exitosamente.\","
	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
      		  @ApiResponse(responseCode = "400", description = "El valor id de usuario no debe ser parte del cuerpo de la petición:",
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
      				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Error de esquema en el mensaje XML.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})), 
      		  @ApiResponse(responseCode = "400-1", description = "El correo electrónico no debe estar vinculado a otro usuario existente:", 
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
        				  		+ "\"responseDetails\" : "
  	      				  		+ "{\"code\": \"400\","
  	      				  		+ "\"message\": \"El correo electronico: 'CarlosBeltran@gmail.com' ya esta registrado.\","
  	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
      		  @ApiResponse(responseCode = "400-2", description = "El correo electrónico debe tener un formato correcto:", 
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
      				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Debe ser una dirección de correo electrónico con formato correcto.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
      		  @ApiResponse(responseCode = "400-3", description = "El correo electrónico no puede ser nulo o vacío:",
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
        				  		+ "\"responseDetails\" : "
  	      				  		+ "{\"code\": \"400\","
  	      				  		+ "\"message\": \"El correo electronico es requerido.\","
  	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
      		  @ApiResponse(responseCode = "400-4", description = "El rol debe ser valido, los roles admitidos son: Administrador, Empleados y Usuario:", 
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
      				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Este rol de usuario no es valido.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
      		 @ApiResponse(responseCode = "474", description = "La ciudad es obligatoria:",
     		 content = @Content(examples = {@ExampleObject(
  				  value = "{\"data\":null,"
    				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"\"La ciudad es requerida.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
      		 @ApiResponse(responseCode = "474", description = "Malas peticiones:",
   		  content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
     				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"474\","
	      				  		+ "\"message\": \"Error en el servidor, contacte con un administrador.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
      })
    @PostMapping(value = "/", produces = { "application/json" })
    public SingleResponse createUser( @Valid @RequestBody UserDTO newUser,BindingResult bindingResult) throws ResponseDetails ;
	
    
    @Operation(summary = "Obtener todos los usuarios",
 		   description = "Devuelve una lista de todos los usuarios existentes, en caso que la coleccion no contenga "
 		   		+ "registros devuelve un mensaje de error."
 		   	)
    @ApiResponses(value = { 
        	@ApiResponse(responseCode = "200", description = "La solicitud ha tenido éxito.",
        		content = { 
        			@Content(mediaType = "*/*",examples = {
                       @ExampleObject( 
                    		   value = "{\"data\" : "
	                       				+ "[{\"id\": \"66495f42101be45fce9411e6\","
	                       				+ "\"name\": \"Carlos Beltran\","
	                       				+ "\"email\": \"CarlosBeltran@gmail.com\","
	                       				+ "\"city\": \"Bogota\","
	                       				+ "\"password\": \"$2a$10$sCLO2rGzBiVnwQRfcJfkH.QCAdOhVcmxpWraLP5WmBUrdrzKgHPm.\","
	                       				+ "\"rol\": \"Administrador\","
	                       				+ "\"createdDate\": \"2024-05-19T02:09:06.205+00:00\","
	                       				+ "\"lastModifiedDate\": \"2024-05-19T02:09:06.205+00:00\"},"
	                       				+ "{\"id\": \"6647af72159d2f5272cf7534\","
	                       				+ "\"name\": \"Martin Mayda\","
	                       				+ "\"email\": \"Martinoly@gmail.com\","
	                       				+ "\"city\": \"Bogota\","
	                       				+ "\"password\": \"$2a$10$G4BkGJ.TgvEPenOiNwQlHufBFZsyrBySrfNg4C4w92NsumyjTL6AC\","
	                       				+ "\"rol\": \"Usuario\","
	                       				+ "\"createdDate\": \"2024-05-17T19:26:42.667+00:00\","
	                       				+ "\"lastModifiedDate\": \"2024-05-17T19:26:42.667+00:00\"}],"
	                       				+ "\"responseDetails\" : "
	                       					+ "{\"code\": \"200\","
	                       					+ "\"message\": \"La solicitud ha tenido éxito.\","
	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
      		  @ApiResponse(responseCode = "404", description = "En caso de que la colección no tenga registros:",
      		  content = @Content(examples = {@ExampleObject(
      				  value = "{\"data\":null,"
      				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"404\","
	      				  		+ "\"message\": \"No existen registros.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})), 
      		@ApiResponse(responseCode = "400", content = @Content),
      		 @ApiResponse(responseCode = "474", description = "Malas peticiones:",
      		 content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
     				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Error en el servidor, contacte con un administrador.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
      })
    @GetMapping("/")
    public MultipleResponse findAllUsers() throws ResponseDetails;
    
    
    @Operation(summary = "Buscar por el id del usuario",
  		   description = "Obtiene todos los datos de un usuario especifico, en el caso que dicho usuario no exista "
  		   		+ "recibira un mensaje de error."
  		   	)
     
     @ApiResponses(value = { 
         	@ApiResponse(responseCode = "200", description = "La solicitud ha tenido éxito.",
         		content = { 
         			@Content(mediaType = "*/*",examples = {
                        @ExampleObject( 
                     		   value = "{\"data\" : "
 	                       				+ "{\"id\": \"66495f42101be45fce9411e6\","
 	                       				+ "\"name\": \"Carlos Beltran\","
 	                       				+ "\"email\": \"CarlosBeltran@gmail.com\","
 	                       				+ "\"city\": \"Bogota\","
 	                       				+ "\"password\": \"$2a$10$sCLO2rGzBiVnwQRfcJfkH.QCAdOhVcmxpWraLP5WmBUrdrzKgHPm.\","
 	                       				+ "\"rol\": \"Empleado\","
 	                       				+ "\"createdDate\": \"2024-05-19T02:09:06.205+00:00\","
 	                       				+ "\"lastModifiedDate\": \"2024-05-19T02:09:06.205+00:00\"},"
 	                       				+ "\"responseDetails\" : "
 	                       					+ "{\"code\": \"200\","
 	                       					+ "\"message\": \"La solicitud ha tenido éxito.\","
 	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
       		  @ApiResponse(responseCode = "404", description = "En caso de que el usuario no exista:",
       		  content = @Content(examples = {@ExampleObject(
       				  value = "{\"data\":null,"
       				  		+ "\"responseDetails\" : "
 	      				  		+ "{\"code\": \"404\","
 	      				  		+ "\"message\": \"Este usuario no existe.\","
 	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})), 
       		@ApiResponse(responseCode = "400", content = @Content),
       		 @ApiResponse(responseCode = "474", description = "Malas peticiones:",
       		 content = @Content(examples = {@ExampleObject(
    				  value = "{\"data\":null,"
      				  		+ "\"responseDetails\" : "
 	      				  		+ "{\"code\": \"400\","
 	      				  		+ "\"message\": \"Error en el servidor, contacte con un administrador.\","
 	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
       })
    @GetMapping("/{id}")
    public SingleResponse getUserById(@PathVariable String id) 
            throws ResponseDetails;
    
    
    @Operation(summary = "Actualizar usuario",
 		   description = "Actualiza un usuario existente donde el correo electronico deben ser valor unico (es decir no"
 		   		+ " estar registrado en el sistema). El id debe enviarse en el cuerpo del mensaje, "
 		   		+ "adicionalmente el correo debe tener un formato correcto.")
 
 @RequestBody(required = true,
 content = @Content( 
 			examples = {
 			 @ExampleObject(value = "{\"id\": \"66495f42101be45fce9411e6\","
 			 					+ "\"name\": \"Carlos Beltran\","
        						+ "\"email\": \"CarlosBeltran@gmail.com\","
        						+ "\"city\": \"Bogota\","
        						+ "\"rol\": \"Usuario\","
        						+ "\"password\": \"12345xse\"}")}))
 
 @ApiResponses(value = { 
     	@ApiResponse(responseCode = "200", description = "El usuario se actualizo exitosamente.",
     		content = { 
     			@Content(mediaType = "*/*",examples = {
                    @ExampleObject( 
                 		   value = "{\"data\" : "
	                       				+ "{\"id\": \"66495f42101be45fce9411e6\","
	                       				+ "\"name\": \"Carlos Beltran\","
	                       				+ "\"email\": \"CarlosBeltran@gmail.com\","
	                       				+ "\"city\": \"Bogota\","
	                       				+ "\"password\": \"$2a$10$sCLO2rGzBiVnwQRfcJfkH.QCAdOhVcmxpWraLP5WmBUrdrzKgHPm.\","
	                       				+ "\"rol\": \"Usuario\","
	                       				+ "\"createdDate\": \"2024-05-19T02:09:06.205+00:00\","
	                       				+ "\"lastModifiedDate\": \"2024-05-19T02:09:06.205+00:00\""
	                       				+ "},\"responseDetails\" : "
	                       					+ "{\"code\": \"200\","
	                       					+ "\"message\": \"El usuario se actualizo exitosamente.\","
	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
     	 @ApiResponse(responseCode = "404", description = "El id del usuario debe corresponder a un usuario existente:",
  		  content = @Content(examples = {@ExampleObject(
  				  value = "{\"data\":null,"
  				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"404\","
	      				  		+ "\"message\": \"Este usuario no existe.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})), 
   		  @ApiResponse(responseCode = "400-1", description = "El correo electrónico no puede estar registrado con otro usuario:", 
   		  content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
     				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"El correo electronico: 'CarlosBeltran@gmail.com' ya esta registrado.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
   		  @ApiResponse(responseCode = "400-2", description = "El correo electrónico debe tener un formato correcto:", 
   		  content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
   				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Debe ser una dirección de correo electrónico con formato correcto.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
   		  @ApiResponse(responseCode = "400-3", description = "El correo electrónico no puede ser nulo o vacío:",
   		  content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
     				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"El correo electronico es requerido.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
   		  @ApiResponse(responseCode = "400-4", description = "El rol debe ser valido, los roles admitidos son: Administrador, Empleados y Usuario:", 
   		  content = @Content(examples = {@ExampleObject(
   				  value = "{\"data\":null,"
   				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"400\","
	      				  		+ "\"message\": \"Este rol de usuario no es valido.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
   		 @ApiResponse(responseCode = "474", description = "La ciudad es obligatoria:",
 		 content = @Content(examples = {@ExampleObject(
				  value = "{\"data\":null,"
				  		+ "\"responseDetails\" : "
      				  		+ "{\"code\": \"400\","
      				  		+ "\"message\": \"\"La ciudad es requerida.\","
      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})),
   		 @ApiResponse(responseCode = "474", description = "Malas peticiones:",
		  content = @Content(examples = {@ExampleObject(
				  value = "{\"data\":null,"
  				  		+ "\"responseDetails\" : "
	      				  		+ "{\"code\": \"474\","
	      				  		+ "\"message\": \"Error en el servidor, contacte con un administrador.\","
	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
   })
    public SingleResponse updateUser(@Valid @RequestBody UserDTO userUpdate,BindingResult bindingResult,
    		@PathVariable String id) throws ResponseDetails;
    
    
    @Operation(summary = "Eliminar usuario por id",
   		   description = "Elimina un usuario especifico, en el caso que dicho usuario no exista recibira un mensaje de error."
   		   	)
      
      @ApiResponses(value = { 
          	@ApiResponse(responseCode = "200", description = "El usuario se elimino exitosamente.",
          		content = { 
          			@Content(mediaType = "*/*",examples = {
                         @ExampleObject( 
                      		   value = "{\"data\" : "
  	                       				+ "{\"id\": \"66495f42101be45fce9411e6\","
  	                       				+ "\"name\": \"Carlos Beltran\","
  	                       				+ "\"email\": \"CarlosBeltran@gmail.com\","
  	                       				+ "\"city\": \"Bogota\","
  	                       				+ "\"password\": \"$2a$10$sCLO2rGzBiVnwQRfcJfkH.QCAdOhVcmxpWraLP5WmBUrdrzKgHPm.\","
  	                       				+ "\"rol\": \"Empleado\","
  	                       				+ "\"createdDate\": \"2024-05-19T02:09:06.205+00:00\","
  	                       				+ "\"lastModifiedDate\": \"2024-05-19T02:09:06.205+00:00\"},"
  	                       				+ "\"responseDetails\" : "
  	                       					+ "{\"code\": \"200\","
  	                       					+ "\"message\": \"El usuario se elimino exitosamente.\","
  	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
        		  @ApiResponse(responseCode = "404", description = "En caso de que el usuario no exista:",
        		  content = @Content(examples = {@ExampleObject(
        				  value = "{\"data\":null,"
        				  		+ "\"responseDetails\" : "
  	      				  		+ "{\"code\": \"404\","
  	      				  		+ "\"message\": \"Este usuario no existe.\","
  	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})), 
        		@ApiResponse(responseCode = "400", content = @Content),
        		 @ApiResponse(responseCode = "474", description = "Malas peticiones:",
        		 content = @Content(examples = {@ExampleObject(
     				  value = "{\"data\":null,"
       				  		+ "\"responseDetails\" : "
  	      				  		+ "{\"code\": \"400\","
  	      				  		+ "\"message\": \"Error en el servidor, contacte con un administrador.\","
  	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
        })
    @DeleteMapping("/{id}")
    public SingleResponse deleteUserById(@PathVariable String id) throws ResponseDetails;
    
    
    @Operation(summary = "Obtener todos los roles",
  		   description = "Devuelve una lista de todos los roles existentes."
  		   	)
     @ApiResponses(value = { 
         	@ApiResponse(responseCode = "200", description = "La solicitud ha tenido éxito.",
         		content = { 
         			@Content(mediaType = "*/*",examples = {
                        @ExampleObject( 
                     		   value = "{\"data\" : "
 	                       				+ "[{\"id\": \"665fe810b64bd656a004a905\","
 	                       				+ "\"code\": \"Roles\","
 	                       				+ "\"rol\": \"Usuario\"},"
 	                       				+ "{\"id\": \"665fe86cb64bd656a004a906\","
 	                       				+ "\"code\": \"Roles\","
	                       				+ "\"rol\": \"Empleado\"},"
 	                       				+ "{\"id\": \"665fe924b64bd656a004a908\","
 	                       				+ "\"code\": \"Roles\","
 	                       				+ "\"rol\": \"Administrador\"}],"
 	                       				+ "\"responseDetails\" : "
 	                       					+ "{\"code\": \"200\","
 	                       					+ "\"message\": \"La solicitud ha tenido éxito.\","
 	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
         	@ApiResponse(responseCode = "400", content = @Content),
       		  @ApiResponse(responseCode = "404", description = "En caso de que la colección no tenga registros:",
       		  content = @Content(examples = {@ExampleObject(
       				  value = "{\"data\":null,"
       				  		+ "\"responseDetails\" : "
 	      				  		+ "{\"code\": \"404\","
 	      				  		+ "\"message\": \"No existen registros.\","
 	      				  		+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")}))
       })
    @GetMapping("/roles")
    public MultipleResponse findAllRoles() throws ResponseDetails;
    
    @Operation(summary = "Validar si el correo ya existe",
   		   description = "Devuelve un valor booleano que indica si el usuario ya esta registrado o no."
   		   	)
      @ApiResponses(value = { 
          	@ApiResponse(responseCode = "200", description = "La solicitud ha tenido éxito.",
          		content = { 
          			@Content(mediaType = "*/*",examples = {
                         @ExampleObject( 
                      		   value = "{\"data\" : "
  	                       				+ "[{\"isEmailAvailable\": \"true\"}],"
  	                       				+ "\"responseDetails\" : "
  	                       					+ "{\"code\": \"200\","
  	                       					+ "\"message\": \"La solicitud ha tenido éxito.\","
  	                       					+ "\"timestamp\": \"2024-05-18T21:09:06.3154494\"}}")})}),
          	@ApiResponse(responseCode = "400", content = @Content)
        })
    @GetMapping("/email/{email}")
    public User findEmail(@PathVariable String email, @RequestParam(required = false) String idUser) throws ResponseDetails;
}
