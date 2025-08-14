package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Paiment;
@Service
public interface PaimentService {
    Paiment addPaiement(Paiment paiement);
    Paiment savePaiement(Paiment paiement);
    void updatePaiement(Paiment paiement);
    void deletPaiementById(Long id);
    void deleteAllePaiements();
    Paiment getPaiementById(Long id);
    List<Paiment> getAllPaiements();

}
