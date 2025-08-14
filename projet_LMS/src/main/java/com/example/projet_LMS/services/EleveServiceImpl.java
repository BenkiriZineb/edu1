package com.example.projet_LMS.services;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.repositories.EleveRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class EleveServiceImpl implements EleveService {
   @Autowired
    private EleveRepository eleveRepository;

    public void addEleve(Eleve eleve) {
        eleveRepository.save(eleve);
    }

    @Override
    public Eleve saveEleve(Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    @Override
    public  Eleve updateEleve(Eleve eleve) {
        if (eleve.getId() != null && eleveRepository.existsById(eleve.getId())) {
         return   eleveRepository.save(eleve);
        }
        throw new IllegalArgumentException("Eleve with id " + eleve.getId() + " does not exist.");
    }

    @Override
    public void deleteEleveById(Long id) {
        eleveRepository.deleteById(id);
    }

    @Override
    public void deleteAllEleves() {
        eleveRepository.deleteAll();
    }

    @Override
    public Eleve getEleveById(Long id) {
        Optional<Eleve> optional = eleveRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public List<Eleve> getAllEleves() {
        return eleveRepository.findAll();
    }

    @Override
    public Eleve getEleveByEmail(String email) {
        return eleveRepository.findByEmail(email);
    }

    @Override
    public Eleve getEleveByName(String name) {
        return eleveRepository.findByNom(name);
    }

    public void removeEleve(Long id) {
        eleveRepository.deleteById(id);
    }

    @Override
    public Optional<Eleve> findById(Long id) {
         Optional<Eleve> optional = eleveRepository.findById(id);
        return Optional.ofNullable(optional.orElse(null));
    }

    
}
