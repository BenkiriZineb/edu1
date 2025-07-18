// src/app/subjects/subjects.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
//import { MATIERES_LIST, NIVEAUX } from './subjects.data';

@Component({
  selector: 'app-subjects',
  standalone: true,
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SubjectsComponent {
 // matieres = MATIERES_LIST;
  niveau: any = null;


}
