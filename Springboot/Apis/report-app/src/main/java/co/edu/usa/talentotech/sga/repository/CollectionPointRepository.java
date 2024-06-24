package co.edu.usa.talentotech.sga.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import co.edu.usa.talentotech.sga.entity.CollectionPoint;


public interface CollectionPointRepository extends MongoRepository<CollectionPoint, String> {
}
