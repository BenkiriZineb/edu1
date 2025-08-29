package com.example.projet_LMS.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projet_LMS.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    
    // Trouver toutes les notes d'un élève
    List<Note> findByEleveId(Long eleveId);
    
    // Trouver toutes les notes d'un cours
    List<Note> findByCoursId(Long coursId);
    
    // Trouver toutes les notes d'une matière
    List<Note> findByMatiereId(Long matiereId);
    
    // Trouver les notes d'un élève dans une matière spécifique
    List<Note> findByEleveIdAndMatiereId(Long eleveId, Long matiereId);
    
    // Trouver les notes d'un élève dans un cours spécifique
    List<Note> findByEleveIdAndCoursId(Long eleveId, Long coursId);
    
    // Trouver les notes par type (devoir, examen, quiz, etc.)
    List<Note> findByType(Note.TypeNote type);
    
    // Trouver les notes d'un élève par type
    List<Note> findByEleveIdAndType(Long eleveId, Note.TypeNote type);
    
    // Trouver les notes d'un élève dans une période donnée
    @Query("SELECT n FROM Note n WHERE n.eleve.id = :eleveId AND n.date BETWEEN :dateDebut AND :dateFin ORDER BY n.date DESC")
    List<Note> findByEleveIdAndDateBetween(@Param("eleveId") Long eleveId, 
                                          @Param("dateDebut") String dateDebut, 
                                          @Param("dateFin") String dateFin);
    
    // Trouver la note la plus récente d'un élève dans une matière
    @Query("SELECT n FROM Note n WHERE n.eleve.id = :eleveId AND n.matiere.id = :matiereId ORDER BY n.date DESC")
    List<Note> findLatestByEleveIdAndMatiereId(@Param("eleveId") Long eleveId, 
                                               @Param("matiereId") Long matiereId);
    
    // Compter le nombre de notes d'un élève
    long countByEleveId(Long eleveId);
    
    // Compter le nombre de notes d'un élève dans une matière
    long countByEleveIdAndMatiereId(Long eleveId, Long matiereId);
}
