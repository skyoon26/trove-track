package com.trovetrack.controller;

import com.trovetrack.dto.InventoryLogDto;
import com.trovetrack.service.InventoryLogService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
@CrossOrigin(origins = "http://localhost:5173/")
public class InventoryLogController {

    private final InventoryLogService inventoryLogService;


    @PostMapping("/logs")
    public ResponseEntity<InventoryLogDto> createLog(@RequestBody InventoryLogDto inventoryLogDto) {
        InventoryLogDto newLog = inventoryLogService.createInventoryLog(inventoryLogDto);

        return new ResponseEntity<>(newLog, HttpStatus.CREATED);
    }

    @GetMapping("/logs")
    public ResponseEntity<List<InventoryLogDto>> getAllLogs() {
        List<InventoryLogDto> logs = inventoryLogService.getAllLogs();

        return new ResponseEntity<>(logs, HttpStatus.OK);
    }


    @GetMapping("/logs/{id}")
    public ResponseEntity<?> getLogById(@PathVariable int id) {
        try {
            InventoryLogDto logDto = inventoryLogService.getLogById(id);

            return ResponseEntity.ok(logDto);
        } catch (EntityNotFoundException e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
