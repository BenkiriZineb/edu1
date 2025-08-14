package com.example.projet_LMS.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Paiment;
import com.example.projet_LMS.repositories.PaimentRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class PaimentServiceImpl implements PaimentService {
private PaimentRepository paiementRepository;
    @Override
    public Paiment addPaiement(Paiment paiement) {
        return paiementRepository.save(paiement);}

    @Override
    public Paiment savePaiement(Paiment paiement) {
       return paiementRepository.save(paiement);
    }

    @Override
    public void updatePaiement(Paiment paiement) {
         paiementRepository.save(paiement);
    }

    @Override
    public void deletPaiementById(Long id) {
        if (paiementRepository.existsById(id)) {
            paiementRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Payment with ID " + id + " does not exist.");
        }
    }

    @Override
    public void deleteAllePaiements() {
        paiementRepository.deleteAll();
    }

    @Override
    public Paiment getPaiementById(Long id) {
        // Implementation for getting a payment by ID
        return paiementRepository.findById(id).get(); // Replace with actual implementation
    }

    @Override
    public List<Paiment> getAllPaiements() {
        // Implementation for getting all payments
        return paiementRepository.findAll(); // Replace with actual implementation
    }
    
}
