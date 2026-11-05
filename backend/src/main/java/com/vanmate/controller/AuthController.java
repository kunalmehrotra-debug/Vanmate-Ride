package com.vanmate.controller;

import com.vanmate.dto.AuthRequest;
import com.vanmate.dto.AuthResponse;
import com.vanmate.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allows Next.js frontend to connect
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        
        // This triggers the CustomUserDetailsService to load the user and check the password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateToken(userDetails);
        
        // Extract the role granted by the UserDetailsService
        String role = userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

        AuthResponse response = AuthResponse.builder()
                .token(jwtToken)
                .id(userDetails.getUsername())
                .role(role)
                .build();

        return ResponseEntity.ok(response);
    }
}
