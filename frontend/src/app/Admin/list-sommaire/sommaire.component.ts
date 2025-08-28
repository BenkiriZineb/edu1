// sommaire.component.ts - Version corrigée
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SommaireService, Sommaire } from './sommaire.service';
import { CoursService, Cours } from '../list-cours/cours.service';

@Component({
  selector: 'app-sommaire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sommaire.component.html',
  styleUrls: ['./sommaire.component.css']
})
export class SommaireComponent implements OnInit {
  currentCours!: Cours;
  sommaires: Sommaire[] = [];
  // ✅ Nouveau sommaire simplifié
  newSommaire: Partial<Sommaire> = { titre: '' };
  
  // 📝 Propriétés pour l'édition inline
  editingId: number | null = null;
  editingTitre: string = '';
  isSubmitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private sommaireService: SommaireService,
    private coursService: CoursService,
     private router: Router
  ) {}

  ngOnInit(): void {
    const idCours = +this.route.snapshot.paramMap.get('coursId')!;
    this.coursService.getCoursById(idCours).subscribe((cours: Cours) => {
      this.currentCours = cours;
      this.loadSommaires();
    });
  }

  loadSommaires(): void {
    this.sommaireService.getSommairesByCours(this.currentCours.id!).subscribe({
      next: (data: Sommaire[]) => {
        this.sommaires = data;
        this.clearMessages();
      },
      error: (err) => {
        console.error(err);
        this.showError('Erreur lors du chargement des sommaires');
      }
    });
  }

  addSommaire(): void {
    if (!this.newSommaire.titre?.trim() || !this.currentCours) return;

    this.isSubmitting = true;
    this.sommaireService.createSommaire(this.currentCours.id!, this.newSommaire)
      .subscribe({
        next: (data) => {
          this.sommaires.push(data);
          this.newSommaire = { titre: '' }; // ✅ Reset simplifié
          this.showSuccess('Sommaire ajouté avec succès !');
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          this.showError('Erreur lors de l\'ajout');
          this.isSubmitting = false;
        }
      });
  }

  // ✏️ Démarrer l'édition inline
  startEdit(sommaire: Sommaire): void {
    if (!sommaire.id) return;
    
    this.editingId = sommaire.id;
    this.editingTitre = sommaire.titre;
    this.clearMessages();
  }

  // 💾 Sauvegarder les modifications
  saveEdit(): void {
    if (!this.editingId || !this.editingTitre.trim()) {
      this.showError('Le titre ne peut pas être vide');
      return;
    }

    this.isSubmitting = true;
    const updatedSommaire = {
      titre: this.editingTitre.trim()
    };

    this.sommaireService.updateSommaire(this.editingId, updatedSommaire)
      .subscribe({
        next: (updated) => {
          // Mettre à jour dans la liste
          const index = this.sommaires.findIndex(s => s.id === this.editingId);
          if (index !== -1) {
            this.sommaires[index] = updated;
          }
          
          this.cancelEdit();
          this.showSuccess('Sommaire modifié avec succès !');
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          this.showError('Erreur lors de la modification');
          this.isSubmitting = false;
        }
      });
  }

  // ❌ Annuler l'édition
  cancelEdit(): void {
    this.editingId = null;
    this.editingTitre = '';
    this.clearMessages();
  }

  // ✅ Delete avec vérification de l'ID
  deleteSommaire(id: number | undefined): void {
    if (!id) {
      this.showError('ID du sommaire invalide');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce sommaire ?')) {
      return;
    }

    this.sommaireService.deleteSommaire(id).subscribe({
      next: () => {
        this.sommaires = this.sommaires.filter(s => s.id !== id);
        this.showSuccess('Sommaire supprimé avec succès');
      },
      error: (err) => {
        console.error(err);
        this.showError('Erreur lors de la suppression');
      }
    });
  }

  // 🛠️ Méthodes utilitaires
  isEditing(sommaire: Sommaire): boolean {
    return this.editingId === sommaire.id;
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.error = null;
    setTimeout(() => this.clearMessages(), 3000);
  }

  private showError(message: string): void {
    this.error = message;
    this.successMessage = null;
    setTimeout(() => this.clearMessages(), 5000);
  }

  private clearMessages(): void {
    this.error = null;
    this.successMessage = null;
  }

  // 🔄 TrackBy pour optimiser les performances
  trackBySommaireId(index: number, item: Sommaire): number | undefined {
    return item.id;
  }
  
  goTochapitre(sommaireId: number | undefined){
    if(sommaireId!==undefined){
      this.router.navigate(['/admin/chapitre',sommaireId])
    }
  }
}