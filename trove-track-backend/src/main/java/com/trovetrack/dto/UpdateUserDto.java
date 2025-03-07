package com.trovetrack.dto;

import lombok.Data;

@Data
public class UpdateUserDto {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String role;
}
