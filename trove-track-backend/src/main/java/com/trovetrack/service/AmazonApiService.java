package com.trovetrack.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trovetrack.dto.AmazonProductDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AmazonApiService {
    @Value("${rapidapi.amazon.url}")
    private String apiUrl;
    @Value("${rapidapi.amazon.key}")
    private String apiKey;
    private final RestTemplate restTemplate;
    public AmazonApiService() {
        this.restTemplate = new RestTemplate();
    }

    public AmazonProductDto getAmazonProduct(String asin) {
        String url = apiUrl + "/product-details?asin=" + asin + "&country=US";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "real-time-amazon-data.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Converts JSON response to AmazonProductDto
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(response.getBody());  // Parses JSON

            JsonNode dataNode = jsonNode.get("data");
            if (dataNode != null && dataNode.has("product_title") && dataNode.has("product_price")) {
                AmazonProductDto productDto = new AmazonProductDto();
                productDto.setProductTitle(dataNode.get("product_title").asText());
                productDto.setProductPrice(dataNode.get("product_price").asDouble());
                return productDto;
            } else {
                throw new RuntimeException("Amazon API response is missing expected product details.");
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse Amazon API response", e);
        }
    }

    public String searchAmazonProducts(String query) {
        String url = apiUrl + "/search?query=" + query + "&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "real-time-amazon-data.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
