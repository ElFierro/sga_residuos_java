package co.edu.usa.talentotech.sga.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.usa.talentotech.sga.entity.CollectionPoint;
import co.edu.usa.talentotech.sga.service.ReportService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/collection-points")
    public ResponseEntity<byte[]> getReports() {
        try {
            byte[] pdfReport = reportService.generateCollectionPointsReport();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=collection_points_report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfReport);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/")
    public ResponseEntity<List<CollectionPoint>> getAllReports( @RequestParam(required = false) String email) {
        List<CollectionPoint> collectionPoints = reportService.getAllCollectionPoints(email);
        return ResponseEntity.ok(collectionPoints);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionPoint> getReportById(@PathVariable String id) {
        CollectionPoint collectionPoint = reportService.getCollectionPointById(id);
        if (collectionPoint == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(collectionPoint);
    }

    @PostMapping("/")
    public ResponseEntity<CollectionPoint> createReport(@RequestBody CollectionPoint collectionPoint) {
        CollectionPoint createdCollectionPoint = reportService.createCollectionPoint(collectionPoint);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCollectionPoint);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionPoint> updateReport(@PathVariable String id, @RequestBody CollectionPoint collectionPoint) {
        CollectionPoint updatedCollectionPoint = reportService.updateCollectionPoint(id, collectionPoint);
        return ResponseEntity.ok(updatedCollectionPoint);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable String id) {
    	reportService.deleteCollectionPoint(id);
        return ResponseEntity.noContent().build();
    }
}
