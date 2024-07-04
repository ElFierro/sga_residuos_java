package co.edu.usa.talentotech.sga.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import co.edu.usa.talentotech.sga.model.User;


@Repository
public interface UserRepository extends MongoRepository<User, String> {
	 Optional<User> findByEmail(String email);
}