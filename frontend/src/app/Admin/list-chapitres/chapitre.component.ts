// chapitre.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapitreService, Chapitre } from './chapitre.service';
import { SommaireService, Sommaire } from '../list-sommaire/sommaire.service';

@Component({
  selector: 'app-chapitre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {
  currentSommaire: Sommaire | null = null;
  chapitres: Chapitre[] = [];
  newChapitre: Partial<Chapitre> = { nom: '', description: '' };
  
  // 📝 Propriétés pour l'édition inline
  editingId: number | null = null;
  editingData = { nom: '', description: '' };
  isSubmitting = false;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapitreService: ChapitreService,
    private sommaireService: SommaireService
  ) {}

  ngOnInit(): void {
    const sommaireId = +this.route.snapshot.paramMap.get('sommaireId')!;
    
    if (sommaireId) {
      this.loadSommaire(sommaireId);
    } else {
      this.handleError('ID du sommaire manquant');
      this.navigateBack();
    }
  }

  private loadSommaire(sommaireId: number): void {
  this.isLoading = true;
  this.sommaireService.getSommaireById(sommaireId).subscribe({
    next: (sommaire: Sommaire) => {
      this.currentSommaire = sommaire;
      this.loadChapitres();
    },
    error: (err: any) => {
      console.error('❌ Erreur lors du chargement du sommaire:', err);
      this.handleError('Impossible de charger le sommaire');
      this.isLoading = false;
    }
  });
}


  loadChapitres(): void {
    if (!this.currentSommaire?.id) return;

    this.chapitreService.getChapitresBySommaire(this.currentSommaire.id).subscribe({
      next: (data: Chapitre[]) => {
        this.chapitres = data;
        this.clearMessages();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des chapitres:', err);
        this.handleError('Impossible de charger les chapitres');
        this.isLoading = false;
      }
    });
  }

  addChapitre(): void {
    if (!this.newChapitre.nom?.trim() || !this.currentSommaire?.id) {
      this.handleError('Le nom du chapitre est requis');
      return;
    }

    this.isSubmitting = true;
    this.chapitreService.createChapitre(this.currentSommaire.id, this.newChapitre)
      .subscribe({
        next: (data) => {
          this.chapitres.push(data);
          this.resetForm();
          this.showSuccess('Chapitre ajouté avec succès !');
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('❌ Erreur lors de l\'ajout:', err);
          this.handleError('Erreur lors de l\'ajout du chapitre');
          this.isSubmitting = false;
        }
      });
  }

  // ✏️ Démarrer l'édition inline
  startEdit(chapitre: Chapitre): void {
    if (!chapitre.id) return;
    
    this.editingId = chapitre.id;
    this.editingData = {
      nom: chapitre.nom,
      description: chapitre.description || ''
    };
    this.clearMessages();
  }

  // 💾 Sauvegarder les modifications
  saveEdit(): void {
    if (!this.editingId || !this.editingData.nom.trim()) {
      this.handleError('Le nom ne peut pas être vide');
      return;
    }

    this.isSubmitting = true;
    this.chapitreService.updateChapitre(this.editingId, this.editingData)
      .subscribe({
        next: (updated) => {
          const index = this.chapitres.findIndex(c => c.id === this.editingId);
          if (index !== -1) {
            this.chapitres[index] = updated;
          }
          
          this.cancelEdit();
          this.showSuccess('Chapitre modifié avec succès !');
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('❌ Erreur lors de la modification:', err);
          this.handleError('Erreur lors de la modification');
          this.isSubmitting = false;
        }
      });
  }

  // ❌ Annuler l'édition
  cancelEdit(): void {
    this.editingId = null;
    this.editingData = { nom: '', description: '' };
    this.clearMessages();
  }

  // ❌ Supprimer un chapitre
  deleteChapitre(id: number | undefined): void {
    if (!id) {
      this.handleError('ID du chapitre invalide');
      return;
    }

    const chapitre = this.chapitres.find(c => c.id === id);
    const nom = chapitre?.nom || 'ce chapitre';
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${nom}" ?\n\nCette action est irréversible.`)) {
      return;
    }

    this.chapitreService.deleteChapitre(id).subscribe({
      next: () => {
        this.chapitres = this.chapitres.filter(c => c.id !== id);
        this.showSuccess('Chapitre supprimé avec succès');
      },
      error: (err) => {
        console.error('❌ Erreur lors de la suppression:', err);
        this.handleError('Impossible de supprimer le chapitre');
      }
    });
  }

  // 🛠️ Méthodes utilitaires
  isEditing(chapitre: Chapitre): boolean {
    return this.editingId === chapitre.id;
  }

  private resetForm(): void {
    this.newChapitre = { nom: '', description: '' };
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.error = null;
    setTimeout(() => this.clearMessages(), 3000);
  }

  private handleError(message: string): void {
    this.error = message;
    this.successMessage = null;
    setTimeout(() => this.clearMessages(), 5000);
  }

  private clearMessages(): void {
    this.error = null;
    this.successMessage = null;
  }

  private navigateBack(): void {
    this.router.navigate(['/sommaires']); // Adapter selon votre routing
  }

  trackByChapitreId(index: number, item: Chapitre): number | undefined {
    return item.id;
  }

  // 🔄 Refresh manuel
  refresh(): void {
    if (this.currentSommaire?.id) {
      this.loadChapitres();
    }
  }

  // 🔙 Retour vers les sommaires
  goBack(): void {
    if (this.currentSommaire?.cours?.id) {
      this.router.navigate(['/sommaires', this.currentSommaire.cours.id]);
    } else {
      this.navigateBack();
    }
  }
}