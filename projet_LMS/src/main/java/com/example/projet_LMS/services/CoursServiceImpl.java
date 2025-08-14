package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Cours;
import com.example.projet_LMS.repositories.CoursRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {

    @Autowired
    private CoursRepository coursRepository;

    // Création
    @Override
    public Cours saveCours(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public void addCours(Cours cours) {
        coursRepository.save(cours);
    }

    // Mise à jour
    @Override
    public void updateCours(Cours cours) {
        if (coursRepository.existsById(cours.getId())) {
            coursRepository.save(cours);
        }
    }

    // Suppression
    @Override
    public void deletCoursById(Long id) {
        coursRepository.deleteById(id);
    }

    @Override
    public void deleteAlleCours() {
        coursRepository.deleteAll();
    }

    public void removeCoursByName(String name) {
        Cours cours = coursRepository.findByNom(name);
        if (cours != null) {
            coursRepository.delete(cours);
        }
    }

    // Lecture
    @Override
    public Cours getCoursById(Long id) {
        return coursRepository.findById(id).orElse(null);
    }

    @Override
    public Cours getCoursByName(String name) {
        return coursRepository.findByNom(name);
    }

    @Override
    public List<Cours> getAllCours() {
        return coursRepository.findAll();
    }
    
}
