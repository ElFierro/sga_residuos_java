package co.edu.usa.talentotech.sga.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.talentotech.sga.model.Route;
import co.edu.usa.talentotech.sga.model.Coordinate;
import co.edu.usa.talentotech.sga.repository.RouteRepository;

import java.util.List;
import java.util.UUID;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public Route saveRoute(Route route) {
        route.getCoordinates().forEach(coordinate -> {
            if (coordinate.getId() == null || coordinate.getId().isEmpty()) {
                coordinate.setId(UUID.randomUUID().toString());
            }
        });
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(String id) {
        return routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Route not found"));
    }

    public Route addCoordinateToRoute(String routeId, Coordinate coordinate) {
        Route route = getRouteById(routeId);
        if (coordinate.getId() == null || coordinate.getId().isEmpty()) {
            coordinate.setId(UUID.randomUUID().toString());
        }
        route.getCoordinates().add(coordinate);
        return routeRepository.save(route);
    }

    public Route removeCoordinateFromRoute(String routeId, String coordinateId) {
        Route route = getRouteById(routeId);
        List<Coordinate> coordinates = route.getCoordinates();
        coordinates.removeIf(coord -> coord.getId().equals(coordinateId));
        return routeRepository.save(route);
    }
    
    public void deleteRouteById(String id) {
        routeRepository.deleteById(id);
    }
}
