package com.trovetrack.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AmazonProductDto {

    @JsonProperty("product_title")
    private String productTitle;

    @JsonProperty("product_price")
    private Double productPrice;
}
