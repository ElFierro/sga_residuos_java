package co.edu.usa.talentotech.sga.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.sga.models.MultipleResponse;
import co.edu.usa.sga.models.ResponseDetails;
import co.edu.usa.sga.models.SingleResponse;
import co.edu.usa.sga.utilities.constans.ResponseMessages;
import co.edu.usa.talentotech.sga.model.Resources;
import co.edu.usa.talentotech.sga.model.Waste;
import co.edu.usa.talentotech.sga.repository.ResourcesRepository;
import co.edu.usa.talentotech.sga.repository.WasteRepository;

@Service
public class WasteService {
	@Autowired
	private WasteRepository repository;

	@Autowired
	private ResourcesRepository resourcesRespository;

	private static final Logger log = LoggerFactory.getLogger(WasteService.class);

	public SingleResponse saveWaste(Waste waste) throws ResponseDetails {
		try {
			if (waste.getId() != null) {
				// validate that the id is not present in the body of the request
				throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_400);
			}

			validateRoutes(waste.getRoute());
			validateClassification(waste.getClassification());
			validateTypeWaste(waste.getTypeWaste(), waste.getClassification());
			// save waste record
			waste = repository.save(waste);
			SingleResponse response = new SingleResponse();
			// create successful response
			response.setData(waste);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;

		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	public MultipleResponse findAllWastes(String email) throws ResponseDetails {
		MultipleResponse response = new MultipleResponse();
		try {
			// search all waste records
			if (email != null) {
				response.setData(repository.findByEmail(email));
			} else {
				response.setData(repository.findAll());
			}
			// validates if the collection of residues contains data
			if (response.getData() == null || response.getData().isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			} else {
				// create successful response
				response.getResponseDetails().setCode(ResponseMessages.CODE_200);
				response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			}
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	public SingleResponse findWasteById(String id) throws ResponseDetails {
		SingleResponse response = new SingleResponse();
		try {
			// search for the record of a specific waste
			Optional<Waste> waste = repository.findById(id);
			// Validate if there is any record with that id
			if (waste.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_404);
			} else {
				// create successful response
				response.setData(waste.get());
				response.getResponseDetails().setCode(ResponseMessages.CODE_200);
				response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
				return response;
			}
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	public SingleResponse updateWaste(Waste waste) throws ResponseDetails {
		try {
			// validates if the id exists in the body of the request
			if (waste.getId() == null) {
				throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_400);
			} else {
				Optional<Waste> existingWaste = repository.findById(waste.getId());
				ValidateWasteIsEmpty(existingWaste);
				waste = createUpdateWaste(existingWaste.get(), waste);
				validateRoutes(waste.getRoute());
				validateClassification(waste.getClassification());
				validateTypeWaste(waste.getTypeWaste(), waste.getClassification());

				repository.save(waste);
				SingleResponse response = new SingleResponse();
				// create successful response
				response.setData(waste);
				response.getResponseDetails().setCode(ResponseMessages.CODE_200);
				response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
				return response;
			}
		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}

	public SingleResponse deleteWasteById(String idWaste) throws ResponseDetails {
		try {
			if (idWaste == null) {
				throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_400);
			} else {
				Optional<Waste> existingUser = repository.findById(idWaste);
				ValidateWasteIsEmpty(existingUser);
				repository.deleteById(idWaste);
				SingleResponse response = new SingleResponse();
				response.setData(existingUser.get());
				response.getResponseDetails().setCode(ResponseMessages.CODE_200);
				response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
				return response;
			}
		} catch (ResponseDetails e) {
			if (e.getCode().isEmpty() || e.getCode().isEmpty()) {
				e.setCode(ResponseMessages.CODE_400);
				e.setMessage(ResponseMessages.ERROR_400);
			}
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
    
	public MultipleResponse findAllRoutes() throws ResponseDetails {
		try {
			MultipleResponse response = new MultipleResponse();
			// run the search for all users
			List<Resources> routes = resourcesRespository.findByCode("Rutas");
			// validate that user collection contains data
			if (routes == null || routes.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);

			}
			// create successful response
			response.setData(routes);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	public MultipleResponse findAllClassificationWaste() throws ResponseDetails {
		try {
			MultipleResponse response = new MultipleResponse();
			// run the search for all users
			List<Resources> classification = resourcesRespository.findByCode("Clasificacion");
			// validate that user collection contains data
			if (classification == null || classification.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			}
			// create successful response
			response.setData(classification);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	public MultipleResponse findAllTypeWaste(String Clasificacion) throws ResponseDetails {
		try {
			MultipleResponse response = new MultipleResponse();
			// run the search for all users
			List<Resources> typeWaste = resourcesRespository.findByCodeAndClassification("Tipo", Clasificacion);
			// validate that user collection contains data
			if (typeWaste == null || typeWaste.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			}
			// create successful response
			response.setData(typeWaste);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}
	
	public MultipleResponse getFilteredWaste(int year, int month, String classification, String type)
			throws ResponseDetails {
		try {
			MultipleResponse response = new MultipleResponse();
			LocalDate startDate = LocalDate.of(year, month, 1);
			LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
			List<Waste> waste = repository.findByDateAdmissionBetweenAndClassificationAndTypeWaste(startDate, endDate,
					classification, type);
			if (waste == null || waste.isEmpty()) {
				throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_NO_RECORDS);
			}
			// create successful response
			response.setData(waste);
			response.getResponseDetails().setCode(ResponseMessages.CODE_200);
			response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
			return response;
		} catch (ResponseDetails e) {
			log.error(e.getCode(), e.getMessage(), e);
			throw e;
		}
	}



	public MultipleResponse getTypesByClassification()
			throws ResponseDetails {
		MultipleResponse response = new MultipleResponse();
		List<Waste> result = new ArrayList<>();
		List<Resources> classifications = resourcesRespository.findByCode("Clasificacion");
		for(Resources classification : classifications) {
			List<Waste> waste = repository.findByClassification(classification.getClassification());
			
			Map<String, Double> totalWeightByType = waste.stream()
		            .collect(Collectors.groupingBy(Waste::getTypeWaste,
		                    Collectors.summingDouble(Waste::getWeight)));

			
			
		    totalWeightByType.forEach((typeWaste, totalWeight) -> {
		        Waste updatedWaste = new Waste();
		        updatedWaste.setTypeWaste(typeWaste);
		        updatedWaste.setWeight(totalWeight);
		        updatedWaste.setClassification(classification.getClassification());
		        
		        result.add(updatedWaste);
		    });
		}
		
		response.setData(result);
		response.getResponseDetails().setCode(ResponseMessages.CODE_200);
		response.getResponseDetails().setMessage(ResponseMessages.ERROR_200);
		return response;
	}
	
	public void ValidateWasteIsEmpty(Optional<Waste> waste) throws ResponseDetails {
		if (waste.isEmpty()) {
			throw new ResponseDetails(ResponseMessages.CODE_404, ResponseMessages.ERROR_404);
		}
	}

	public void validateRoutes(String route) throws ResponseDetails {
		if (!resourcesRespository.existsByRouteAndCode(route, "Rutas")) {
			throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_VALID_ROUTES);
		}
	}

	public void validateClassification(String classification) throws ResponseDetails {
		if (!resourcesRespository.existsByClassificationAndCode(classification, "Clasificacion")) {
			throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_VALID_CLASSIFICATION_WASTE);
		}
	}

	public void validateTypeWaste(String type, String classification) throws ResponseDetails {
		if (!resourcesRespository.existsByTypeAndClassificationAndCode(type, classification, "Tipo")) {
			throw new ResponseDetails(ResponseMessages.CODE_400, ResponseMessages.ERROR_VALID_TYPE_WASTE);
		}
	}

	public Waste createUpdateWaste(Waste existingWaste, Waste wasteUpdate) {

		if (wasteUpdate.getClassification() != null) {
			existingWaste.setClassification(wasteUpdate.getClassification());
		}

		if (wasteUpdate.getRoute() != null) {
			existingWaste.setRoute(wasteUpdate.getRoute());
		}

		if (wasteUpdate.getTypeWaste() != null) {
			existingWaste.setTypeWaste(wasteUpdate.getTypeWaste());
		}

		if (wasteUpdate.getWeight() != null) {
			existingWaste.setWeight(wasteUpdate.getWeight());
		}
		return existingWaste;
	}
}
