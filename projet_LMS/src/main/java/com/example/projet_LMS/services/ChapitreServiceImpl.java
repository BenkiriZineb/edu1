package com.example.projet_LMS.services;

import com.example.projet_LMS.model.Chapitre;
import com.example.projet_LMS.repositories.ChapitreRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class ChapitreServiceImpl implements ChapitreService {

  
    private final ChapitreRepository chapitreRepository;

    @Override
    public Chapitre createChapitre(Chapitre chapitre) {
        if (chapitreRepository.existsByNom(chapitre.getNom())) {
            throw new IllegalArgumentException("Un chapitre avec ce nom existe déjà");
        }
        return chapitreRepository.save(chapitre);
    }

    @Override
    public Optional<Chapitre> getChapitreById(Long id) {
        return chapitreRepository.findById(id);
    }

    @Override
    public Optional<Chapitre> getChapitreByNom(String nom) {
        return chapitreRepository.findByNom(nom);
    }

    @Override
    public List<Chapitre> getAllChapitres() {
        return chapitreRepository.findAll();
    }

    @Override
    public Optional<Chapitre> updateChapitre(Long id, Chapitre chapitreDetails) {
        return chapitreRepository.findById(id)
                .map(existingChapitre -> {
                    if (!existingChapitre.getNom().equals(chapitreDetails.getNom()) && 
                        chapitreRepository.existsByNom(chapitreDetails.getNom())) {
                        throw new IllegalArgumentException("Un chapitre avec ce nom existe déjà");
                    }
                    existingChapitre.setNom(chapitreDetails.getNom());
                    existingChapitre.setDescription(chapitreDetails.getDescription());
                    return chapitreRepository.save(existingChapitre);
                });
    }

    @Override
    public void deleteChapitre(Long id) {
        chapitreRepository.deleteById(id);
    }

    @Override
    public void deleteAllChapitres() {
        chapitreRepository.deleteAll();
    }


}

