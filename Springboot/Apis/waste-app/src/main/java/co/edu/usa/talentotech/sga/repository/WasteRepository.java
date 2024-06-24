package co.edu.usa.talentotech.sga.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import co.edu.usa.talentotech.sga.model.Waste;
@Repository
public interface WasteRepository extends MongoRepository<Waste, String>{
	List<Waste> findByEmail(String email);
	
	List<Waste> findByDateAdmissionBetweenAndClassificationAndTypeWaste(LocalDate startDate, LocalDate endDate, String classification, String type);
	
	List<Waste>findByClassification(String classification);
}
