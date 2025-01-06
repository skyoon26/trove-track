package com.trovetrack.dto;

import lombok.Data;

@Data // Gets boilerplate code from lombok
public class LoginDto {

    private String username;
    private String password;
}
