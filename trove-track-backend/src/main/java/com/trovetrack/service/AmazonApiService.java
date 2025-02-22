package com.trovetrack.service;

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

    public String fetchAmazonProduct(String productId) {
        String url = apiUrl + "/product-details?asin=" + productId + "&country=US";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "real-time-amazon-data.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
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
