package com.example.projet_LMS.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // ✅ Désactiver CSRF pour les API REST
            .csrf(csrf -> csrf.disable())
            
            // ✅ Permettre TOUTES les requêtes sans authentification
            .authorizeHttpRequests(authz -> authz
                .anyRequest().permitAll() // ✅ Tout est accessible
            )
            
            // ✅ Désactiver la protection des frames
            .headers(headers -> headers.frameOptions().disable());

        return http.build();
    }
}