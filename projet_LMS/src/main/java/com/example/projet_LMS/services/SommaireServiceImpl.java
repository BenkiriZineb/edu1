package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Sommaire;
import com.example.projet_LMS.repositories.SommaireRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SommaireServiceImpl implements SommaireService {

   @Autowired
    private SommaireRepository sommaireRepository;

    @Override
    public Sommaire addSommaire(Sommaire sommaire) {
        return sommaireRepository.save(sommaire);
    }

    @Override
    public Sommaire updateSommaire(Sommaire sommaire) {
        return sommaireRepository.save(sommaire);
    }

    @Override
    public void deleteSommaireById(Long id) {
        sommaireRepository.deleteById(id);
    }

    @Override
    public void deleteAllSommaires() {
        sommaireRepository.deleteAll();
    }

    @Override
    public Sommaire getSommaireById(Long id) {
        return sommaireRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Sommaire with ID " + id + " does not exist."));
    }

    @Override
    public List<Sommaire> getAllSommaires() {
        return sommaireRepository.findAll();
    }

    @Override
    public Sommaire saveSommaire(Sommaire sommaire) {
        return sommaireRepository.save(sommaire);
    }

    
}
