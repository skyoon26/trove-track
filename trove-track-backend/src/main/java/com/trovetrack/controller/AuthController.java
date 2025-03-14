package com.trovetrack.controller;

import com.trovetrack.dto.AuthResponseDto;
import com.trovetrack.dto.LoginDto;
import com.trovetrack.dto.RegisterDto;
import com.trovetrack.dto.UpdateUserDto;
import com.trovetrack.entity.Role;
import com.trovetrack.entity.UserEntity;
import com.trovetrack.repository.RoleRepository;
import com.trovetrack.repository.UserRepository;
import com.trovetrack.security.JwtGenerator;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173/")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        // User validation
        if(userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("Username already in use", HttpStatus.BAD_REQUEST);
        }

        // If the username is not found in the database, create and save a new User entity
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());

        // Fetches the "USER" role from the database and assigns it to the User
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role 'USER' not found"));

        user.setRole(role);

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        // Authenticate the user by Validating credentials
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        // If authentication is successful, store the user's authentication in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

    @GetMapping("/account")
    public ResponseEntity<UserEntity> getAccountInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/account/update")
    public ResponseEntity<?> updateAccount(Principal principal, @RequestBody UpdateUserDto updateUserDto) {
        String username = principal.getName();

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (updateUserDto.getFirstName() != null) {
            user.setFirstName(updateUserDto.getFirstName());
        }
        if (updateUserDto.getLastName() != null) {
            user.setLastName(updateUserDto.getLastName());
        }
        if (updateUserDto.getEmail() != null) {
            user.setEmail(updateUserDto.getEmail());
        }
        if (updateUserDto.getUsername() != null) {
            user.setUsername(updateUserDto.getUsername());
        }
        if (updateUserDto.getRole() != null) {
            String roleName = updateUserDto.getRole();
            Role role = roleRepository.findByName(roleName)
                            .orElseThrow(() -> new EntityNotFoundException("Role with name " + roleName + " not found"));
            user.setRole(role);
        }

        userRepository.save(user);
        return ResponseEntity.ok("Account updated successfully!");
    }
}
