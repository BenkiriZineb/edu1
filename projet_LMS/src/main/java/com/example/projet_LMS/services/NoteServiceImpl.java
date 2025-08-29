package com.example.projet_LMS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet_LMS.model.Note;
import com.example.projet_LMS.repositories.NoteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;

    // Opérations CRUD de base
    @Override
    public Note saveNote(Note note) {
        if (!isNoteValide(note.getValeur(), note.getNoteMaximale())) {
            throw new IllegalArgumentException("Note invalide : la valeur doit être entre 0 et la note maximale");
        }
        return noteRepository.save(note);
    }

    @Override
    public Note updateNote(Long id, Note noteDetails) {
        Optional<Note> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent()) {
            Note existingNote = optionalNote.get();
            
            if (noteDetails.getValeur() != null) {
                if (!isNoteValide(noteDetails.getValeur(), noteDetails.getNoteMaximale())) {
                    throw new IllegalArgumentException("Note invalide : la valeur doit être entre 0 et la note maximale");
                }
                existingNote.setValeur(noteDetails.getValeur());
            }
            
            if (noteDetails.getNoteMaximale() != null) {
                existingNote.setNoteMaximale(noteDetails.getNoteMaximale());
            }
            
            if (noteDetails.getCommentaire() != null) {
                existingNote.setCommentaire(noteDetails.getCommentaire());
            }
            
            if (noteDetails.getDate() != null) {
                existingNote.setDate(noteDetails.getDate());
            }
            
            if (noteDetails.getType() != null) {
                existingNote.setType(noteDetails.getType());
            }
            
            return noteRepository.save(existingNote);
        }
        throw new IllegalArgumentException("Note avec l'ID " + id + " non trouvée");
    }

    @Override
    public void deleteNoteById(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Note avec l'ID " + id + " non trouvée");
        }
    }

    @Override
    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Opérations métier pour les élèves
    @Override
    public List<Note> getNotesByEleve(Long eleveId) {
        return noteRepository.findByEleveId(eleveId);
    }

    @Override
    public List<Note> getNotesByEleveAndMatiere(Long eleveId, Long matiereId) {
        return noteRepository.findByEleveIdAndMatiereId(eleveId, matiereId);
    }

    @Override
    public List<Note> getNotesByEleveAndCours(Long eleveId, Long coursId) {
        return noteRepository.findByEleveIdAndCoursId(eleveId, coursId);
    }

    @Override
    public List<Note> getNotesByEleveAndType(Long eleveId, Note.TypeNote type) {
        return noteRepository.findByEleveIdAndType(eleveId, type);
    }

    // Opérations métier pour les cours
    @Override
    public List<Note> getNotesByCours(Long coursId) {
        return noteRepository.findByCoursId(coursId);
    }

    @Override
    public List<Note> getNotesByMatiere(Long matiereId) {
        return noteRepository.findByMatiereId(matiereId);
    }

    // Calculs de moyennes
    @Override
    public Double calculerMoyenneEleve(Long eleveId) {
        List<Note> notes = getNotesByEleve(eleveId);
        if (notes.isEmpty()) return 0.0;
        
        double total = notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .sum();
        
        return Math.round((total / notes.size()) * 100.0) / 100.0;
    }

    @Override
    public Double calculerMoyenneEleveMatiere(Long eleveId, Long matiereId) {
        List<Note> notes = getNotesByEleveAndMatiere(eleveId, matiereId);
        if (notes.isEmpty()) return 0.0;
        
        double total = notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .sum();
        
        return Math.round((total / notes.size()) * 100.0) / 100.0;
    }

    @Override
    public Double calculerMoyenneCours(Long coursId) {
        List<Note> notes = getNotesByCours(coursId);
        if (notes.isEmpty()) return 0.0;
        
        double total = notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .sum();
        
        return Math.round((total / notes.size()) * 100.0) / 100.0;
    }

    @Override
    public Double calculerMoyenneMatiere(Long matiereId) {
        List<Note> notes = getNotesByMatiere(matiereId);
        if (notes.isEmpty()) return 0.0;
        
        double total = notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .sum();
        
        return Math.round((total / notes.size()) * 100.0) / 100.0;
    }

    // Statistiques
    @Override
    public Double getNoteMaximaleEleve(Long eleveId) {
        List<Note> notes = getNotesByEleve(eleveId);
        if (notes.isEmpty()) return 0.0;
        
        return notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .max()
                .orElse(0.0);
    }

    @Override
    public Double getNoteMinimaleEleve(Long eleveId) {
        List<Note> notes = getNotesByEleve(eleveId);
        if (notes.isEmpty()) return 0.0;
        
        return notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .min()
                .orElse(0.0);
    }

    @Override
    public Double getNoteMaximaleEleveMatiere(Long eleveId, Long matiereId) {
        List<Note> notes = getNotesByEleveAndMatiere(eleveId, matiereId);
        if (notes.isEmpty()) return 0.0;
        
        return notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .max()
                .orElse(0.0);
    }

    @Override
    public Double getNoteMinimaleEleveMatiere(Long eleveId, Long matiereId) {
        List<Note> notes = getNotesByEleveAndMatiere(eleveId, matiereId);
        if (notes.isEmpty()) return 0.0;
        
        return notes.stream()
                .mapToDouble(note -> note.getPourcentage())
                .min()
                .orElse(0.0);
    }

    // Recherche par période
    @Override
    public List<Note> getNotesByEleveAndDateRange(Long eleveId, String dateDebut, String dateFin) {
        return noteRepository.findByEleveIdAndDateBetween(eleveId, dateDebut, dateFin);
    }

    // Validation des notes
    @Override
    public boolean isNoteValide(Double valeur, Double noteMaximale) {
        return valeur != null && noteMaximale != null && 
               valeur >= 0 && valeur <= noteMaximale && noteMaximale > 0;
    }

    @Override
    public boolean peutAjouterNote(Long eleveId, Long coursId, Note.TypeNote type) {
        // Vérifier si l'élève est inscrit au cours
        // Cette logique peut être étendue selon vos besoins
        return true; // Pour l'instant, on autorise tout
    }
}
