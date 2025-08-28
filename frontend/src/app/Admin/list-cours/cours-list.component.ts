// cours-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService, Cours } from './cours.service';

@Component({
  selector: 'app-cours-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ ici on importe les modules nécessaires
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {

  cours: Cours[] = [];
  matiereId!: number;
 
  // ✅ ajout de newCours
  newCours: Cours = {  nom: '', description: '' };

  constructor(private coursService: CoursService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.matiereId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCours();
  }

  loadCours() {
    this.coursService.getCoursByMatiere(this.matiereId).subscribe(data => {
      this.cours = data;
    });
  }

  addCours(cours: Cours) {
    this.coursService.addCours(this.matiereId, cours).subscribe(() => {
      this.newCours = {  nom: '', description: '' }; // reset
      this.loadCours();
    });
  }

  updateCours(cours: Cours) {
    this.coursService.updateCours(cours).subscribe(() => this.loadCours());
  }

  deleteCours(id: number) {
    if (confirm('Supprimer ce cours ?')) {
      this.coursService.deleteCours(id).subscribe(() => this.loadCours());
    }
  }

  goToSommaire(coursId: number | undefined) {
    if (coursId !== undefined) {
      this.router.navigate(['/admin/sommaire', coursId]);
    }
  }
}
