package com.trovetrack.security;

import com.trovetrack.entity.Role;
import com.trovetrack.entity.UserEntity;
import com.trovetrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service // This class loads user-specific data for authentication and authorization
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired // Constructor with userRepository dependency injection
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override // This is a built-in method part of the UserDetailsService (Spring Security interface), it is used to fetch the user's data for authentication
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        return new User(user.getUsername(), user.getPassword(), mapRoleToAuthorities(user.getRole()));
    }

    // This method converts a list of roles (ADMIN, USER) into Spring Security authorities to manage access control
    private Collection<GrantedAuthority> mapRoleToAuthorities(Role role) {

        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
