package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Paragraphe;
import com.example.projet_LMS.repositories.ParagrapheRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ParagrapheServiceImpl implements ParagrapheService {
    @Autowired
    private ParagrapheRepository paragrapheRepository;

    @Override
    public Paragraphe addParagraphe(Paragraphe paragraphe)
     { return paragrapheRepository.save(paragraphe);}
     
     @Override
    public Paragraphe updateParagraphe(Paragraphe paragraphe)
    {
        return paragrapheRepository.save(paragraphe);
    }
    @Override
    public void deleteParagrapheById(Long id){
        paragrapheRepository.deleteById(id);
            
    }
    @Override
    public void deleteAllParagraphes()
    {
        paragrapheRepository.deleteAll();
    }
    @Override
    public Paragraphe getParagrapheById(Long id)
    {
        return paragrapheRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Paragraphe with ID " + id + " does not exist."));  
    }
    @Override
    public List<Paragraphe> getAllParagraphes()
    {
        return paragrapheRepository.findAll();
    }
}
