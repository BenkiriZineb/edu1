package com.example.projet_LMS.services;

import java.util.List;
import java.util.Optional;

import com.example.projet_LMS.model.Note;

public interface NoteService {
    
    // Opérations CRUD de base
    Note saveNote(Note note);
    Note updateNote(Long id, Note note);
    void deleteNoteById(Long id);
    Optional<Note> getNoteById(Long id);
    List<Note> getAllNotes();
    
    // Opérations métier pour les élèves
    List<Note> getNotesByEleve(Long eleveId);
    List<Note> getNotesByEleveAndMatiere(Long eleveId, Long matiereId);
    List<Note> getNotesByEleveAndCours(Long eleveId, Long coursId);
    List<Note> getNotesByEleveAndType(Long eleveId, Note.TypeNote type);
    
    // Opérations métier pour les cours
    List<Note> getNotesByCours(Long coursId);
    List<Note> getNotesByMatiere(Long matiereId);
    
    // Calculs de moyennes
    Double calculerMoyenneEleve(Long eleveId);
    Double calculerMoyenneEleveMatiere(Long eleveId, Long matiereId);
    Double calculerMoyenneCours(Long coursId);
    Double calculerMoyenneMatiere(Long matiereId);
    
    // Statistiques
    Double getNoteMaximaleEleve(Long eleveId);
    Double getNoteMinimaleEleve(Long eleveId);
    Double getNoteMaximaleEleveMatiere(Long eleveId, Long matiereId);
    Double getNoteMinimaleEleveMatiere(Long eleveId, Long matiereId);
    
    // Recherche par période
    List<Note> getNotesByEleveAndDateRange(Long eleveId, String dateDebut, String dateFin);
    
    // Validation des notes
    boolean isNoteValide(Double valeur, Double noteMaximale);
    boolean peutAjouterNote(Long eleveId, Long coursId, Note.TypeNote type);
}
