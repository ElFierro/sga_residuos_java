package co.edu.usa.talentotech.sga.controller;

import co.edu.usa.sga.models.MultipleResponse;
import co.edu.usa.sga.models.ResponseDetails;
import co.edu.usa.sga.models.SingleResponse;
import co.edu.usa.sga.utilities.constans.ResponseMessages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import co.edu.usa.talentotech.sga.dto.UserDTO;
import co.edu.usa.talentotech.sga.model.User;
import co.edu.usa.talentotech.sga.service.UserService;

import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController implements UserControllerApi{

    @Autowired
    private UserService service;

	@Override
	@PostMapping("/")
    public SingleResponse createUser(@Valid @RequestBody UserDTO newUser,BindingResult bindingResult) throws ResponseDetails {
        SingleResponse responseUser = new SingleResponse();
      
        if(bindingResult.hasErrors()) {
        	throw new ResponseDetails(ResponseMessages.CODE_400,bindingResult.getFieldError().getDefaultMessage());
        }
        try {
        	responseUser = service.createUser(newUser);
        } catch (ResponseDetails e) {
        	responseUser.setResponseDetails(e);
        }
        return responseUser;
    }    

	@Override
    @GetMapping("/")
    public MultipleResponse findAllUsers() throws ResponseDetails {
        MultipleResponse responseUsers = new MultipleResponse();
        try {
        	responseUsers = service.findAllUsers();
        } catch (ResponseDetails e) {
        	responseUsers.setResponseDetails(e);
        }
        return responseUsers;
    }

	@Override
    @GetMapping("/{id}")
    public SingleResponse getUserById(@PathVariable String id) throws ResponseDetails {
        SingleResponse responseUser = new SingleResponse();
        try {
        	responseUser = service.getUserById(id);
        } catch (ResponseDetails e) {
        	responseUser.setResponseDetails(e);
        }
        return responseUser;
    }

    @DeleteMapping("/{id}")
    public SingleResponse deleteUserById( @PathVariable String id) throws ResponseDetails {
        SingleResponse responseUser = new SingleResponse();
        try {
        	responseUser = service.deleteUserById(id);
        } catch (ResponseDetails e) {
        	responseUser.setResponseDetails(e);
        }
        return responseUser;
    }    

    @Override
    @PutMapping("/{id}")
    public SingleResponse updateUser(@Valid @RequestBody UserDTO userUpdate,BindingResult bindingResult,
    		@PathVariable String id) throws ResponseDetails {
            SingleResponse responseUser = new SingleResponse();
            if(bindingResult.hasErrors()) {
            	throw new ResponseDetails(ResponseMessages.CODE_400,bindingResult.getFieldError().getDefaultMessage());
            }
        try {
        	responseUser =  service.updateUser(userUpdate, id);
        } catch (ResponseDetails e) {
        	responseUser.setResponseDetails(e);
        }
        return responseUser;
    }  
    
    @Override
    @GetMapping("/roles")
    public MultipleResponse findAllRoles() throws ResponseDetails {
        MultipleResponse responseRoles = new MultipleResponse();
        try {
        	responseRoles = service.findAllRoles();
        } catch (ResponseDetails e) {
        	responseRoles.setResponseDetails(e);
        }
        return responseRoles;
    }
    
    @Override
    @GetMapping("/email/{email}")
    public User findEmail(@PathVariable String email, @RequestParam(required = false) String idUser) throws ResponseDetails {
    	return service.emailExist(email, idUser);
    }

}
