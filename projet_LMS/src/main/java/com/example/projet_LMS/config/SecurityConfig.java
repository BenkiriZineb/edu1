package com.example.projet_LMS.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            // ✅ Désactiver CSRF pour les API REST
            .csrf(csrf -> csrf.disable())
            
            // ✅ Configurer CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // ✅ Permettre TOUTES les requêtes sans authentification
            .authorizeHttpRequests(authz -> authz
                .anyRequest().permitAll() // ✅ Tout est accessible
            )
            
            // ✅ Désactiver la protection des frames
            .headers(headers -> headers.frameOptions().disable());

        return http.build();
    }
}