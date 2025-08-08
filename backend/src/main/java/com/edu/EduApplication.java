package com.edu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class EduApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "🚀 Backend Spring Boot fonctionne !";
    }

    @GetMapping("/api/test/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Backend fonctionne parfaitement !");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    @GetMapping("/api/test/info")
    public Map<String, Object> info() {
        Map<String, Object> info = new HashMap<>();
        info.put("application", "Plateforme Éducative Marocaine");
        info.put("version", "1.0.0");
        info.put("framework", "Spring Boot 3.2.0");
        info.put("java", "Java 17");
        info.put("database", "H2 (développement)");
        return info;
    }
} 