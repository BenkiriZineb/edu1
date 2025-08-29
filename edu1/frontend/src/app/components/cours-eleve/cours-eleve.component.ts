import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere, Cours, Eleve } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-cours-eleve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cours-eleve.component.html',
  styleUrls: ['./cours-eleve.component.css']
})
export class CoursEleveComponent implements OnInit {
  eleve: Eleve | null = null;
  matieres: Matiere[] = [];
  cours: Cours[] = [];
  coursRecents: Cours[] = [];
  selectedMatiere: string = '';
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('📚 Cours Élève - Initialisation...');
    
    // Connexion automatique pour les tests
    if (!this.authService.isAuthenticated()) {
      this.authService.login('eleve1', 'password', 'eleve');
    }
    
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'eleve') {
      this.eleve = user as Eleve;
      this.chargerDonnees();
    } else {
      this.router.navigate(['/login']);
    }
  }

  chargerDonnees(): void {
    if (!this.eleve) return;

    // Charger les matières
    this.educationService.getMatieres(this.eleve.niveau).subscribe(matieres => {
      this.matieres = matieres;
      console.log('📖 Matières chargées:', matieres);
    });

    // Charger les cours
    this.educationService.getCours().subscribe(cours => {
      this.cours = cours.filter(c => c.niveau === this.eleve?.niveau);
      this.coursRecents = this.cours.slice(0, 3);
      console.log('📚 Cours chargés:', this.cours);
    });
  }

  // Filtrage des cours
  get coursFiltres(): Cours[] {
    let cours = this.cours;
    
    if (this.selectedMatiere) {
      cours = cours.filter(c => c.matiere === this.selectedMatiere);
    }
    
    if (this.searchTerm) {
      cours = cours.filter(c => 
        c.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    return cours;
  }

  // Navigation
  retourDashboard(): void {
    this.router.navigate(['/dashboard-eleve']);
  }

  voirCours(coursId: number): void {
    console.log('Voir le cours:', coursId);
    // Ici vous pourriez naviguer vers une page de détail du cours
  }

  // Getters pour le template
  get matieresUniques(): string[] {
    return [...new Set(this.cours.map(c => c.matiere))];
  }
}
