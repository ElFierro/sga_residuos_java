package co.edu.usa.talentotech.sga.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import co.edu.usa.talentotech.sga.model.Resources;


@Repository
public interface ResourcesRepository extends MongoRepository<Resources, String> {
	List<Resources> findByCode(String code);
	
	boolean existsByRolAndCode(String rol, String code);
}
