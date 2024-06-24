package co.edu.usa.talentotech.sga.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import co.edu.usa.talentotech.sga.model.Resources;


@Repository
public interface ResourcesRepository extends MongoRepository<Resources, String> {
	
	List<Resources> findByCode(String code);
	
	List<Resources> findByCodeAndClassification(String code, String classification);
	
	boolean existsByRouteAndCode(String route, String code);
	
	boolean existsByClassificationAndCode(String classification, String code);
	
	boolean existsByTypeAndClassificationAndCode(String type,String classification, String code);
	
}
