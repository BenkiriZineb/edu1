package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Parent;
import com.example.projet_LMS.repositories.ParentRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ParentServiceImpl implements ParentService {
    @Autowired
    private ParentRepository parentRepository;
    @Override
    public Parent addParent(Parent parent) {
        return parentRepository.save(parent);
    }
    @Override
    public Parent saveParent(Parent parent) {
        return parentRepository.save(parent);
    }   
    @Override
    public Parent updateParent(Parent parent) {
        if (parentRepository.existsById(parent.getId())) {
            return parentRepository.save(parent);
        }
        return null;
    }
    @Override
    public void deletParentById(Long id) {
        parentRepository.deleteById(id);
    }
    @Override
    public void deleteAlleParent() {
        parentRepository.deleteAll();
    }
    @Override
    public Parent getParentById(Long id) {
        return parentRepository.findById(id).orElse(null);
    }
    @Override
    public List<Parent> getAllParent() {
        return parentRepository.findAll();
    }

     
}
