package com.example.projet_LMS.services;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Eleve;
import com.example.projet_LMS.model.InscriptionEleveDTO;
import com.example.projet_LMS.model.NiveauScolaire;
import com.example.projet_LMS.repositories.EleveRepository;
import com.example.projet_LMS.repositories.NiveauScolaireRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class EleveServiceImpl implements EleveService {
   @Autowired
    private EleveRepository eleveRepository;
    
    @Autowired
    private NiveauScolaireRepository niveauScolaireRepository;

    public void addEleve(Eleve eleve) {
        eleveRepository.save(eleve);
    }

    @Override
    public Eleve saveEleve(Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    @Override
    public  Eleve updateEleve(Eleve eleve) {
        if (eleve.getId() != null && eleveRepository.existsById(eleve.getId())) {
         return   eleveRepository.save(eleve);
        }
        throw new IllegalArgumentException("Eleve with id " + eleve.getId() + " does not exist.");
    }

    @Override
    public void deleteEleveById(Long id) {
        eleveRepository.deleteById(id);
    }

    @Override
    public void deleteAllEleves() {
        eleveRepository.deleteAll();
    }

    @Override
    public Eleve getEleveById(Long id) {
        Optional<Eleve> optional = eleveRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public List<Eleve> getAllEleves() {
        return eleveRepository.findAll();
    }

    @Override
    public Eleve getEleveByEmail(String email) {
        return eleveRepository.findByEmail(email);
    }

    @Override
    public Eleve getEleveByName(String name) {
        return eleveRepository.findByNom(name);
    }

    public void removeEleve(Long id) {
        eleveRepository.deleteById(id);
    }

    @Override
    public Optional<Eleve> findById(Long id) {
         Optional<Eleve> optional = eleveRepository.findById(id);
        return Optional.ofNullable(optional.orElse(null));
    }

    @Override
    public Eleve createEleveWithNiveauScolaire(InscriptionEleveDTO inscriptionDTO) {
        // Créer ou récupérer le niveau scolaire
        NiveauScolaire niveauScolaire = createOrGetNiveauScolaire(inscriptionDTO.getNiveauScolaire());
        
        // Créer l'élève avec les setters
        Eleve eleve = new Eleve();
        eleve.setNom(inscriptionDTO.getNom());
        eleve.setPrenom(inscriptionDTO.getPrenom());
        eleve.setEmail(inscriptionDTO.getEmail());
        eleve.setMdp(inscriptionDTO.getMdp());
        eleve.setRole(inscriptionDTO.getRole());
        eleve.setSexe(inscriptionDTO.getSexe());
        eleve.setDatedenaissance(inscriptionDTO.getDatedenaissance());
        eleve.setAdresse(inscriptionDTO.getAdresse());
        eleve.setNiveauScolaireObj(niveauScolaire);
        
        return eleveRepository.save(eleve);
    }
    
    private NiveauScolaire createOrGetNiveauScolaire(String niveauScolaireString) {
        // Logique pour créer ou récupérer le niveau scolaire
        // Pour l'instant, créons un niveau scolaire basique
        NiveauScolaire niveau = new NiveauScolaire();
        niveau.setClasse(niveauScolaireString);
        niveau.setNiveau_etude(getNiveauEtudeFromString(niveauScolaireString));
        niveau.setAnneeScolaire("2024-2025");
        
        return niveauScolaireRepository.save(niveau);
    }
    
    private String getNiveauEtudeFromString(String niveauString) {
        if (niveauString.toLowerCase().contains("crèche") || niveauString.toLowerCase().contains("maternelle")) {
            return "PRESCOLAIRE";
        } else if (niveauString.toLowerCase().contains("cp") || niveauString.toLowerCase().contains("ce") || niveauString.toLowerCase().contains("cm")) {
            return "PRIMAIRE";
        } else if (niveauString.toLowerCase().contains("ème") || niveauString.toLowerCase().contains("sixième") || niveauString.toLowerCase().contains("cinquième")) {
            return "COLLEGE";
        } else if (niveauString.toLowerCase().contains("nde") || niveauString.toLowerCase().contains("ère") || niveauString.toLowerCase().contains("terminale")) {
            return "LYCEE";
        } else if (niveauString.toLowerCase().contains("bac") || niveauString.toLowerCase().contains("licence") || niveauString.toLowerCase().contains("master")) {
            return "SUPERIEUR";
        } else {
            return "AUTRE";
        }
    }
}
