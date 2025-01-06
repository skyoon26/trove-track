package com.trovetrack.dto;

import lombok.Data;

@Data // Gets boilerplate code from lombok
public class RegisterDto {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
