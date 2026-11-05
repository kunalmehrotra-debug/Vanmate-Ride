package com.vanmate.security;

import com.vanmate.entity.AdminDetails;
import com.vanmate.entity.Parent;
import com.vanmate.entity.School;
import com.vanmate.repository.AdminDetailsRepository;
import com.vanmate.repository.ParentRepository;
import com.vanmate.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminDetailsRepository adminDetailsRepository;
    private final ParentRepository parentRepository;
    private final SchoolRepository schoolRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try Admin
        Optional<AdminDetails> adminOpt = adminDetailsRepository.findById(username);
        if (adminOpt.isPresent()) {
            return User.withUsername(adminOpt.get().getId())
                    // Prefixing with {noop} because old passwords are plain text in DB
                    .password("{noop}" + adminOpt.get().getPassword())
                    .roles("ADMIN")
                    .build();
        }

        // Try Parent
        Optional<Parent> parentOpt = parentRepository.findById(username);
        if (parentOpt.isPresent()) {
            return User.withUsername(parentOpt.get().getId())
                    .password("{noop}" + parentOpt.get().getPassword())
                    .roles("PARENT")
                    .build();
        }

        // Try School
        Optional<School> schoolOpt = schoolRepository.findById(username);
        if (schoolOpt.isPresent()) {
            return User.withUsername(schoolOpt.get().getId())
                    .password("{noop}" + schoolOpt.get().getPassword())
                    .roles("SCHOOL")
                    .build();
        }

        // We aren't checking Driver because the driver table uses an Integer ID and lacks a login password in the legacy schema.
        // We'll throw if none match.
        throw new UsernameNotFoundException("User not found with ID: " + username);
    }
}
