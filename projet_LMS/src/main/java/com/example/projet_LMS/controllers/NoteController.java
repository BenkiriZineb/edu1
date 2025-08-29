package com.example.projet_LMS.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.projet_LMS.model.Note;
import com.example.projet_LMS.services.NoteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    // === OPÉRATIONS CRUD DE BASE ===
    
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        try {
            Note savedNote = noteService.saveNote(note);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNote);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteService.getNoteById(id);
        return note.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note noteDetails) {
        try {
            Note updatedNote = noteService.updateNote(id, noteDetails);
            return ResponseEntity.ok(updatedNote);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        try {
            noteService.deleteNoteById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // === OPÉRATIONS MÉTIER POUR LES ÉLÈVES ===
    
    @GetMapping("/eleve/{eleveId}")
    public ResponseEntity<List<Note>> getNotesByEleve(@PathVariable Long eleveId) {
        List<Note> notes = noteService.getNotesByEleve(eleveId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/eleve/{eleveId}/matiere/{matiereId}")
    public ResponseEntity<List<Note>> getNotesByEleveAndMatiere(
            @PathVariable Long eleveId, 
            @PathVariable Long matiereId) {
        List<Note> notes = noteService.getNotesByEleveAndMatiere(eleveId, matiereId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/eleve/{eleveId}/cours/{coursId}")
    public ResponseEntity<List<Note>> getNotesByEleveAndCours(
            @PathVariable Long eleveId, 
            @PathVariable Long coursId) {
        List<Note> notes = noteService.getNotesByEleveAndCours(eleveId, coursId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/eleve/{eleveId}/type/{type}")
    public ResponseEntity<List<Note>> getNotesByEleveAndType(
            @PathVariable Long eleveId, 
            @PathVariable Note.TypeNote type) {
        List<Note> notes = noteService.getNotesByEleveAndType(eleveId, type);
        return ResponseEntity.ok(notes);
    }

    // === OPÉRATIONS MÉTIER POUR LES COURS ===
    
    @GetMapping("/cours/{coursId}")
    public ResponseEntity<List<Note>> getNotesByCours(@PathVariable Long coursId) {
        List<Note> notes = noteService.getNotesByCours(coursId);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/matiere/{matiereId}")
    public ResponseEntity<List<Note>> getNotesByMatiere(@PathVariable Long matiereId) {
        List<Note> notes = noteService.getNotesByMatiere(matiereId);
        return ResponseEntity.ok(notes);
    }

    // === CALCULS DE MOYENNES ===
    
    @GetMapping("/eleve/{eleveId}/moyenne")
    public ResponseEntity<Double> getMoyenneEleve(@PathVariable Long eleveId) {
        Double moyenne = noteService.calculerMoyenneEleve(eleveId);
        return ResponseEntity.ok(moyenne);
    }

    @GetMapping("/eleve/{eleveId}/matiere/{matiereId}/moyenne")
    public ResponseEntity<Double> getMoyenneEleveMatiere(
            @PathVariable Long eleveId, 
            @PathVariable Long matiereId) {
        Double moyenne = noteService.calculerMoyenneEleveMatiere(eleveId, matiereId);
        return ResponseEntity.ok(moyenne);
    }

    @GetMapping("/cours/{coursId}/moyenne")
    public ResponseEntity<Double> getMoyenneCours(@PathVariable Long coursId) {
        Double moyenne = noteService.calculerMoyenneCours(coursId);
        return ResponseEntity.ok(moyenne);
    }

    @GetMapping("/matiere/{matiereId}/moyenne")
    public ResponseEntity<Double> getMoyenneMatiere(@PathVariable Long matiereId) {
        Double moyenne = noteService.calculerMoyenneMatiere(matiereId);
        return ResponseEntity.ok(moyenne);
    }

    // === STATISTIQUES ===
    
    @GetMapping("/eleve/{eleveId}/stats")
    public ResponseEntity<NoteStats> getStatsEleve(@PathVariable Long eleveId) {
        Double moyenne = noteService.calculerMoyenneEleve(eleveId);
        Double noteMax = noteService.getNoteMaximaleEleve(eleveId);
        Double noteMin = noteService.getNoteMinimaleEleve(eleveId);
        long totalNotes = noteService.getNotesByEleve(eleveId).size();
        
        NoteStats stats = new NoteStats(moyenne, noteMax, noteMin, totalNotes);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/eleve/{eleveId}/matiere/{matiereId}/stats")
    public ResponseEntity<NoteStats> getStatsEleveMatiere(
            @PathVariable Long eleveId, 
            @PathVariable Long matiereId) {
        Double moyenne = noteService.calculerMoyenneEleveMatiere(eleveId, matiereId);
        Double noteMax = noteService.getNoteMaximaleEleveMatiere(eleveId, matiereId);
        Double noteMin = noteService.getNoteMinimaleEleveMatiere(eleveId, matiereId);
        long totalNotes = noteService.getNotesByEleveAndMatiere(eleveId, matiereId).size();
        
        NoteStats stats = new NoteStats(moyenne, noteMax, noteMin, totalNotes);
        return ResponseEntity.ok(stats);
    }

    // === RECHERCHE PAR PÉRIODE ===
    
    @GetMapping("/eleve/{eleveId}/periode")
    public ResponseEntity<List<Note>> getNotesByEleveAndDateRange(
            @PathVariable Long eleveId,
            @RequestParam String dateDebut,
            @RequestParam String dateFin) {
        List<Note> notes = noteService.getNotesByEleveAndDateRange(eleveId, dateDebut, dateFin);
        return ResponseEntity.ok(notes);
    }

    // === VALIDATION ===
    
    @PostMapping("/validation")
    public ResponseEntity<Boolean> validateNote(@RequestBody NoteValidationRequest request) {
        boolean isValid = noteService.isNoteValide(request.getValeur(), request.getNoteMaximale());
        return ResponseEntity.ok(isValid);
    }

    // === CLASSES INTERNES POUR LES RÉPONSES ===
    
    public static class NoteStats {
        private Double moyenne;
        private Double noteMaximale;
        private Double noteMinimale;
        private Long totalNotes;

        public NoteStats(Double moyenne, Double noteMaximale, Double noteMinimale, Long totalNotes) {
            this.moyenne = moyenne;
            this.noteMaximale = noteMaximale;
            this.noteMinimale = noteMinimale;
            this.totalNotes = totalNotes;
        }

        // Getters et Setters
        public Double getMoyenne() { return moyenne; }
        public void setMoyenne(Double moyenne) { this.moyenne = moyenne; }
        
        public Double getNoteMaximale() { return noteMaximale; }
        public void setNoteMaximale(Double noteMaximale) { this.noteMaximale = noteMaximale; }
        
        public Double getNoteMinimale() { return noteMinimale; }
        public void setNoteMinimale(Double noteMinimale) { this.noteMinimale = noteMinimale; }
        
        public Long getTotalNotes() { return totalNotes; }
        public void setTotalNotes(Long totalNotes) { this.totalNotes = totalNotes; }
    }

    public static class NoteValidationRequest {
        private Double valeur;
        private Double noteMaximale;

        // Getters et Setters
        public Double getValeur() { return valeur; }
        public void setValeur(Double valeur) { this.valeur = valeur; }
        
        public Double getNoteMaximale() { return noteMaximale; }
        public void setNoteMaximale(Double noteMaximale) { this.noteMaximale = noteMaximale; }
    }
}
