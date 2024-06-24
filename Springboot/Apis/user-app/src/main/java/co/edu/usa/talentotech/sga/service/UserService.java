package co.edu.usa.talentotech.sga.service;

import co.edu.usa.sga.models.*;
import co.edu.usa.sga.utilities.AuthTools;
import co.edu.usa.sga.utilities.constans.ResponseMessages;

import org.springframework.stereotype.Service;

import co.edu.usa.talentotech.sga.dto.UserDTO;
import co.edu.usa.talentotech.sga.mail.MailManager;
import co.edu.usa.talentotech.sga.model.Resources;
import co.edu.usa.talentotech.sga.model.User;
import co.edu.usa.talentotech.sga.repository.ResourcesRepository;
import co.edu.usa.talentotech.sga.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Service
@RequiredArgsConstructor
public class UserService implements EncriptService {
	
	

	@Autowired
	private UserRepository userRespository;
	
	@Autowired
	private ResourcesRepository resourcesRespository;

	private static final Logger log = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	MailManager mailManager;


	public void sendMessageUser(String name, String email, String password) {
		mailManager.sendMessage(name, email,password);
	}
	
	/**
	 * creates a new user with the encrypted password where the email, clientId and
	 * client secret must be unique values, a valid roleUser must be sent
	 * 
	 * @param token
	 * @param user
	 * @return Response
	 * @throws ResponseDetails
	 */
	public SingleResponse createUser(UserDTO userDto) throws ResponseDetails {
		try {
			// validate if email, clientId, ClientSecret already exists
			validateEmail(userDto.getEmail());
			if(userDto.getRol()!= null) {
				validateRol(userDto.getRol());
			}
			
			User user = createNewUser(userDto);
			String passwordGenerate= null;
			if(user.getPassword() == null || user.getPassword().isEmpty()) {
				passwordGenerate= AuthTools.GeneratePassword();
				user.setPassword(passwordGenerate);
			}
			user.setPassword(encrypPassword(user.getPassword()));
			//Create user
			userRespository.save(user);
			if(passwordGenerate != null) {
				sendMessageUser(user.getName(), user.getEmail(),passwordGenerate);
			}
			//Create successful response
			return singleResponseUser(user,ResponseMessages.CODE_200, ResponseMessages.USER_CREATED);
		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	/**
	 * 
	 * validates if there are records in the data collection and returns a list of
	 * all users
	 * 
	 * @param token
	 * @return Response
	 * @throws ResponseDetails
	 */
	public MultipleResponse findAllUsers() throws ResponseDetails {
		try {
			// run the search for all users
			List<User> users = userRespository.findAll();
			// validate that user collection contains data
			if (users == null || users.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			} 
			// create successful response
			return multipleReponsUser(users,ResponseMessages.CODE_200,ResponseMessages.ERROR_200);
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	
	/**
	 * searches if a user exists with a specific id, and returns its data
	 * 
	 * @param token
	 * @param id
	 * @return Response
	 * @throws ResponseDetails
	 */
	public SingleResponse getUserById(String id) throws ResponseDetails {
		try {
			// run the search for the specific user
			Optional<User> user = userRespository.findById(id);
			// Validate if the user with that id exists
			userIdIsEmpty(user.isEmpty());
			// create successful response
			return singleResponseUser(user.get(),ResponseMessages.CODE_200, ResponseMessages.ERROR_200);
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	/**
	 * validates if the user exists, updates the user's name, city, email and role
	 * 
	 * @param token
	 * @param user
	 * @return Response
	 * @throws ResponseDetails
	 */
	public SingleResponse updateUser(UserDTO userDto, String id) throws ResponseDetails {
		try {
			Optional<User> existingUser = userRespository.findById(id);
			// validates if a user exists with that id
			ValidateUserIsEmpty(existingUser);
			validateRol(userDto.getRol());
			// validate if there is a change in the email
			if (!existingUser.get().getEmail().equals(userDto.getEmail())) {
				// validate if the new email does not exist in the database
				validateEmail(userDto.getEmail());
			}
			User user = new User();
			// Create the user with the data to be updated
			user = createUpdateUser(existingUser.get(), userDto);
			//Update user
			userRespository.save(user);
			// create successful response
			return singleResponseUser(user,ResponseMessages.CODE_200, ResponseMessages.USER_UPDATE);
		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	/**
	 * validates if the user exists, and removes it from the collection
	 * 
	 * @param token
	 * @param idUser
	 * @return Response
	 * @throws ResponseDetails
	 */
	public SingleResponse deleteUserById(String idUser) throws ResponseDetails {
		try {
			userIdIsNull(idUser);
			Optional<User> existingUser = userRespository.findById(idUser);
			ValidateUserIsEmpty(existingUser);
			userRespository.deleteById(idUser);
			return singleResponseUser(existingUser.get(),ResponseMessages.CODE_200, ResponseMessages.USER_DELETE);
		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	public MultipleResponse findAllRoles() throws ResponseDetails {
		try {
			MultipleResponse response = new MultipleResponse();
			// run the search for all users
			List<Resources> roles = resourcesRespository.findByCode("Roles");
			// validate that user collection contains data
			if (roles == null || roles.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			} 
			// create successful response
			response.setData(roles);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	public User emailExist(String email, String idUser) {
		User user = new User();
		boolean notAvailable = true;
		if(idUser != null) {
			if(userRespository.existsByEmailAndId(email, idUser)) {
				notAvailable= false;
			}
		}
		if (notAvailable) {
			notAvailable=userRespository.existsByEmail(email);
		}
		user.setIsEmailAvailable(notAvailable);
		return user;
	}
	
	public MultipleResponse multipleReponsUser(List<User> data, String code, String message) throws ResponseDetails {
		MultipleResponse responseUsers = new MultipleResponse();
		responseUsers.setData(data);
		responseUsers.getResponseDetails().setCode(code);
		responseUsers.getResponseDetails().setMessage(message);
		return responseUsers;
	}
	
	public SingleResponse singleResponseUser(User data, String code, String message) throws ResponseDetails {
		SingleResponse responseUser = new SingleResponse();
		responseUser.setData(data);
		responseUser.getResponseDetails().setCode(code);
		responseUser.getResponseDetails().setMessage(message);
		return responseUser;
	}
	
	public void userIdExists(String userId) throws ResponseDetails {
		if (userId != null) {
			throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_400);
		}
	}

	public void userIdIsEmpty(Boolean userIsEmpty) throws ResponseDetails {
		if (userIsEmpty) {
			throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NON_EXISTING_USER);
		}
	}

	public void userIdIsNull(String userId) throws ResponseDetails {
		if (userId == null) {
			throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_400);
		}
	}

	public void validateEmail(String email) throws ResponseDetails {
		if (userRespository.existsByEmail(email)) {
			throw new ResponseDetails(ResponseMessages.CODE_400,
					ResponseMessages.ERROR_EMAIL_EXISTING.replace("email", email));
		}
	}
	
	public void validateRol(String rol) throws ResponseDetails {
		if (!resourcesRespository.existsByRolAndCode(rol, "Roles")) {
			throw new ResponseDetails(ResponseMessages.CODE_400,
					ResponseMessages.ERROR_VALID_ROL);
		}
	}
	
	public void ValidateUserIsEmpty(Optional<User> user) throws ResponseDetails {
		if (user.isEmpty()) {
			throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NON_EXISTING_USER);
		}
	}

	public User createNewUser(UserDTO userDto) throws ResponseDetails {
		User user = new User();
		
		if(!(userDto.getPassword() == null)) {
			user.setPassword(userDto.getPassword());
		}
		
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail().toLowerCase());
		if(userDto.getRol() == null || userDto.getRol().isEmpty()) {
			user.setRol("Usuario");
		}else {
			user.setRol(userDto.getRol());
		}
		
		user.setCity(userDto.getCity());
		return user;
	}
	
	public User createUpdateUser(User existingUser, UserDTO userDto) {

		if (userDto.getName() != null) {
			existingUser.setName(userDto.getName());
		}
		if (userDto.getEmail() != null) {
			existingUser.setEmail(userDto.getEmail().toLowerCase());
		}
		if (userDto.getRol() != null) {
			existingUser.setRol(userDto.getRol());
		}
		return existingUser;
	}

	@Override
	public String encrypPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}

}
