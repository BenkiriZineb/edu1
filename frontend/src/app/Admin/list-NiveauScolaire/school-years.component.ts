// school-years.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { NiveauScolaireService, NiveauScolaire } from './niveau-scolaire.service';
import { NavbarAdminComponent } from '../navbarAdmin/navbarAdmin.component';

@Component({
  selector: 'app-school-years',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NavbarAdminComponent
  ],
  templateUrl: './school-years.component.html',
  styleUrls: ['./school-years.component.css']
})
export class SchoolYearsComponent implements OnInit {
  niveaux: NiveauScolaire[] = [];
  newNiveau: NiveauScolaire = this.createEmptyNiveau();

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  // Loading states
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  // SUPPRIMEZ cette ligne: router: any;
  // Le router est déjà injecté via le constructeur

  constructor(
    private niveauService: NiveauScolaireService,
    private router: Router // Router injecté correctement
  ) {}

  ngOnInit(): void {
    this.loadNiveaux();
  }

  // Charger les niveaux depuis l'API
  loadNiveaux(): void {
    this.isLoading = true;
    this.niveauService.getAll().subscribe({
      next: (data) => {
        this.niveaux = data;
        this.calculateTotalPages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des niveaux:', error);
        this.isLoading = false;
      }
    });
  }

  // Récupérer les éléments paginés
  getPaginatedNiveaux(): NiveauScolaire[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.niveaux.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Pagination : page précédente
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Pagination : page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Aller à une page spécifique
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Ajouter un niveau
  addNiveau(): void {
    if (this.isValidNiveau(this.newNiveau)) {
      this.isSubmitting = true;
      this.niveauService.create(this.newNiveau).subscribe({
        next: () => {
          this.loadNiveaux();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout du niveau:", error);
          this.isSubmitting = false;
        }
      });
    }
  }

  // Supprimer un niveau
  deleteNiveau(niveau: NiveauScolaire): void {
    if (niveau.id && confirm(`Êtes-vous sûr de vouloir supprimer le niveau "${niveau.niveau_etude}" ?`)) {
      this.niveauService.delete(niveau.id).subscribe({
        next: () => {
          this.loadNiveaux();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du niveau:', error);
        }
      });
    }
  }

  // Navigation vers les matières d'un niveau
  goToMatieres(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/niveaux', id, 'matieres']);
    }
  }

  // Calcul du nombre total de pages
  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.niveaux.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  // Créer un niveau vide
  private createEmptyNiveau(): NiveauScolaire {
    return {
      niveau_etude: '',
      anneeScolaire: '',
      classe: '',
      filiere: ''
    };
  }

  // Réinitialiser le formulaire
  private resetForm(): void {
    this.newNiveau = this.createEmptyNiveau();
  }

  // Vérification des champs obligatoires
  private isValidNiveau(niveau: NiveauScolaire): boolean {
    return !!(
      niveau.niveau_etude?.trim() &&
      niveau.anneeScolaire?.trim() &&
      niveau.classe?.trim() &&
      niveau.filiere?.trim()
    );
  }

  // Helpers pour pagination
  getPaginationArray(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.niveaux.length);
  }
}