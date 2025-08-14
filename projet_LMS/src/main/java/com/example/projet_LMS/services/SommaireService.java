package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Sommaire;
@Service
public interface SommaireService {
    Sommaire addSommaire(Sommaire sommaire);
    Sommaire updateSommaire(Sommaire sommaire);
    Sommaire saveSommaire(Sommaire sommaire);
    void deleteSommaireById(Long id);
    void deleteAllSommaires();
    Sommaire getSommaireById(Long id);
    List<Sommaire> getAllSommaires();
}
