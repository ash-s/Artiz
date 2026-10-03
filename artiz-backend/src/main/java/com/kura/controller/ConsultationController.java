package com.kura.controller;

import com.kura.dto.ConsultationRequestDto;
import com.kura.model.ConsultationRequest;
import com.kura.repository.ConsultationRequestRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "*")
public class ConsultationController {

    private final ConsultationRequestRepository consultationRepository;

    public ConsultationController(ConsultationRequestRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    @GetMapping
    public List<ConsultationRequest> getConsultations(@RequestParam(defaultValue = "NEW") String status) {
        return consultationRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitConsultation(@Valid @RequestBody ConsultationRequestDto dto) {
        ConsultationRequest req = new ConsultationRequest();
        req.setCustomerName(dto.getCustomerName());
        req.setEmail(dto.getEmail());
        req.setPhone(dto.getPhone());
        req.setRoomType(dto.getRoomType());
        req.setPreferredStyle(dto.getPreferredStyle());
        req.setBudgetRange(dto.getBudgetRange());
        req.setProjectNotes(dto.getProjectNotes());
        req.setFloorplanAttachmentUrl(dto.getFloorplanAttachmentUrl());
        req.setStatus("NEW");

        ConsultationRequest saved = consultationRepository.save(req);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("id", saved.getId());
        response.put("message", "Interior design consultation booked successfully. Our architect will reach out within 24 hours.");
        response.put("data", saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
