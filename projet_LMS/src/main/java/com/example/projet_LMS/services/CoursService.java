package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Cours;


@Service
public interface CoursService {
    void addCours(Cours cours);
    Cours saveCours(Cours cours);
    void updateCours(Cours cours);
    void deletCoursById(Long id);
    void deleteAlleCours();
    Cours getCoursById(Long id);
    Cours getCoursByName(String name);
    List<Cours> getAllCours();
    

}
