package com.example.projet_LMS.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Matiere;
import com.example.projet_LMS.repositories.MatiereRepository;
import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class MatiereServiceImpl implements MatiereService {
    
    @Autowired
    private MatiereRepository matiereRepository;

    @Override
    public void addMatiere(Matiere matiere) {
        matiereRepository.save(matiere);
    }

    @Override
    public Matiere saveMatiere(Matiere matiere) {
        return matiereRepository.save(matiere);
    }

    @Override
    public void updateMatiere(Matiere matiere) {
        if (matiere.getId() != null && matiereRepository.existsById(matiere.getId())) {
            matiereRepository.save(matiere);
        } else {
            throw new IllegalArgumentException("Matiere with ID " + matiere.getId() + " not found.");
        }
    }

    @Override
    public void deleteMatiereById(Long id) {
        matiereRepository.deleteById(id);
    }

    @Override
    public void deleteAllMatieres() {
        matiereRepository.deleteAll();
    }

    @Override
    public Matiere getMatiereById(Long id) {
        Optional<Matiere> optional = matiereRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Matiere getMatiereByName(String name) {
        return matiereRepository.findByNom(name);
    }

    @Override
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }

   
}
