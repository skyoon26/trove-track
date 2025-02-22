package com.trovetrack.controller;

import com.trovetrack.service.AmazonApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/amazon")
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
public class AmazonApiController {

    private final AmazonApiService amazonApiService;

    @GetMapping("/product")
    public ResponseEntity<String> getAmazonProduct(@RequestParam String asin) {
        String data = amazonApiService.fetchAmazonProduct(asin);
        return ResponseEntity.ok(data);
    }
}
