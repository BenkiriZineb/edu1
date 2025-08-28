import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService, Matiere } from './matiere.service';

@Component({
  selector: 'app-matieres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  matieres: Matiere[] = [];
  newMatiere!: Matiere; // ⚠️ on l'initialise plus tard
  niveauId!: number;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matiereService: MatiereService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Niveau ID:', idParam);
    if (idParam) {
      this.niveauId = Number(idParam);

      // 👉 on initialise ici, une fois qu'on a niveauId
      this.newMatiere = {
        nom: '',
        coeficient: 1,
        niveauScolaire: { id: this.niveauId }
      };

      this.loadMatieres();
    }
  }
 

  loadMatieres(): void {
    this.isLoading = true;
    this.matiereService.getByNiveauId(this.niveauId).subscribe({
      next: (data) => {
        this.matieres = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement matières:', err);
        this.isLoading = false;
      }
    });
  }

  addMatiere(): void {
    if (!this.newMatiere.nom.trim()) return;
    this.isSubmitting = true;

    const payload: Matiere = {
      ...this.newMatiere,
      niveauScolaire: { id: this.niveauId } // ✅ pas "niveau"
    };

    this.matiereService.create(payload).subscribe({
      next: () => {
        this.loadMatieres();
        this.newMatiere = { nom: '', coeficient: 1, niveauScolaire: { id: this.niveauId } };
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Erreur ajout matière:', err);
        this.isSubmitting = false;
      }
    });
  }

  updateMatiere(matiere: Matiere): void {
    if (!matiere.id) return;

    const payload: Matiere = {
      ...matiere,
      niveauScolaire: { id: this.niveauId } // ✅ correction
    };

    this.matiereService.update(payload).subscribe({
      next: () => this.loadMatieres(),
      error: (err) => console.error('Erreur modification matière:', err)
    });
  }

  deleteMatiere(id: number | undefined): void {
    if (!id) return;
    if (confirm('Supprimer cette matière ?')) {
      this.matiereService.delete(id).subscribe({
        next: () => this.loadMatieres(),
        error: (err) => console.error('Erreur suppression matière:', err)
      });
    }
  }

  trackById(index: number, item: Matiere) {
    return item.id;
  }
goToCours(matiereId: number | undefined): void {
  if (matiereId) {
    this.router.navigate(['/matiere', matiereId, 'cours']); 
  }
}

}
