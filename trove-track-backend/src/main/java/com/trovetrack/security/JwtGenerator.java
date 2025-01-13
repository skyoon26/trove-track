package com.trovetrack.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtGenerator {

    // Secure 512-bit key for HS512 signing algorithm
    private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // Generates a JWT token for the authenticated user
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        // Build and sign the JWT with the username, issued date, and expiration date
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key)
                .compact();
        return token;
    }

    // Extracts user-specific information
    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // Verifies the authenticity and validity of an existing JWT
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key) // Convert string to Key
                    .build() // Build the parser
                    .parseClaimsJws(token); // Parse and validate the JWT
            return true;
        } catch (Exception e) {
            // Handle invalid or expired JWT token
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}