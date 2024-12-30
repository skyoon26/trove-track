package com.trovetrack.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // Lets Spring Boot know this is where security configuration is kept
public class SecurityConfig {

    private CustomUserDetailsService userDetailsService;

    @Autowired // Injects the CustomerUserDetailsService
    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // Security filter chain configuration needed for routing/intercepting requests before they get sent to the controllers
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Cross-Site Request Forgery disabled temporarily
                .httpBasic(httpBasic -> httpBasic.realmName("TroveTrack")) // Sets it to the form of HTTP versus HTTPS
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated()); // Ensures all requests are authenticated

        return http.build(); // This is a builder pattern that is going to build the actual chain
    }

    @Bean
    public UserDetailsService users() {
        UserDetails admin = User.builder() // Builds and returns in-memory users
                        .username("admin")
                        .password("password")
                        .roles("ADMIN")
                        .build();
        UserDetails user = User.builder()
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean // Built-in components that allow Spring Security to manage user authentication automatically
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean // Provides a PasswordEncoder to securely encode passwords using BCrypt (hashing algorithm)
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
