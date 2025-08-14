package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Paragraphe;
@Service
public interface ParagrapheService {
    Paragraphe addParagraphe(Paragraphe paragraphe);
    Paragraphe updateParagraphe(Paragraphe paragraphe);
    void deleteParagrapheById(Long id);
    void deleteAllParagraphes();
    Paragraphe getParagrapheById(Long id);
    List<Paragraphe> getAllParagraphes();
}
