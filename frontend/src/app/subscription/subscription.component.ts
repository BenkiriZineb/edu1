import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  activeTab: 'student' | 'teacher' = 'student';
  parentChoice: 'existing' | 'new' | null = null;
  
  studentForm: FormGroup;
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      nationalite: ['', Validators.required],
      tele: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      niveauScolaire: ['', Validators.required],
      adresse: ['', Validators.required],
      
      // Parent existant
      parentEmail: [''],
      parentNom: [''],
      
      // Nouveau parent
      newParentNom: [''],
      newParentPrenom: [''],
      newParentTele: [''],
      newParentEmail: [''],
      nombreEnfants: ['']
    });

    this.teacherForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      nationalite: ['', Validators.required],
      tele: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      filiere: ['', Validators.required],
      matiere: ['', Validators.required]
    });
  }

  setActiveTab(tab: 'student' | 'teacher'): void {
    this.activeTab = tab;
    this.parentChoice = null;
    this.studentForm.reset();
    this.teacherForm.reset();
  }

  setParentChoice(choice: 'existing' | 'new'): void {
    this.parentChoice = choice;
  }

  onStudentSubmit(): void {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      console.log('Données étudiant:', formData);
      alert('Inscription étudiant réussie !');
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }

  onTeacherSubmit(): void {
    if (this.teacherForm.valid) {
      const formData = this.teacherForm.value;
      console.log('Données enseignant:', formData);
      alert('Inscription enseignant réussie !');
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }
} 