package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Parent;
@Service
public interface ParentService {
    Parent addParent(Parent parent);
    Parent saveParent(Parent parent);
    Parent updateParent(Parent parent);
    void deletParentById(Long id);
    void deleteAlleParent();
    Parent getParentById(Long id);
    List<Parent> getAllParent();

}
