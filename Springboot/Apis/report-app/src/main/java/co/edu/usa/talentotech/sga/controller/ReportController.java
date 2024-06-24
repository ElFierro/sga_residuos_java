package co.edu.usa.talentotech.sga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.usa.talentotech.sga.service.ReportService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/collection-points")
    public ResponseEntity<byte[]> getCollectionPointsReport() {
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
}
