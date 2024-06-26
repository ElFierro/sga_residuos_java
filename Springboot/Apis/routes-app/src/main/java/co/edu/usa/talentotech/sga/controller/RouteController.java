package co.edu.usa.talentotech.sga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import co.edu.usa.talentotech.sga.model.Route;
import co.edu.usa.talentotech.sga.model.Coordinate;
import co.edu.usa.talentotech.sga.service.RouteService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/")
    public ResponseEntity<Route> createRoute(@RequestBody Route route) {
        Route savedRoute = routeService.saveRoute(route);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoute);
    }

    @GetMapping("/")
    public ResponseEntity<List<Route>> getAllRoutes() {
        List<Route> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable String id) {
        Route route = routeService.getRouteById(id);
        return ResponseEntity.ok(route);
    }

    @PostMapping("/{id}/coordinates")
    public ResponseEntity<Route> addCoordinateToRoute(@PathVariable String id, @RequestBody Coordinate coordinate) {
        Route updatedRoute = routeService.addCoordinateToRoute(id, coordinate);
        return ResponseEntity.ok(updatedRoute);
    }

    @DeleteMapping("/{routeId}/coordinates/{coordinateId}")
    public ResponseEntity<Route> removeCoordinateFromRoute(@PathVariable String routeId, @PathVariable String coordinateId) {
        Route updatedRoute = routeService.removeCoordinateFromRoute(routeId, coordinateId);
        return ResponseEntity.ok(updatedRoute);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRouteById(@PathVariable String id) {
        routeService.deleteRouteById(id);
        return ResponseEntity.noContent().build();
    }
}
