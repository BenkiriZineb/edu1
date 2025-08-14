package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Admin;


@Service

public interface AdminService {
   List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin saveAdmin(Admin admin);
    void deleteAdmin(Long id);
    void updateAdmin(Admin admin);
    void deleteAdminById(Long id);
    Admin getAdminByEmail(String email);

   
}
