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

  onParentSubmit(): void {
    if (this.parentChoice === 'existing') {
      // Vérifier les champs du parent existant
      const parentEmail = this.studentForm.get('parentEmail')?.value;
      const parentNom = this.studentForm.get('parentNom')?.value;
      
      if (parentEmail && parentNom) {
        const parentData = {
          type: 'existing',
          email: parentEmail,
          nom: parentNom
        };
        console.log('Inscription parent existant:', parentData);
        alert('Inscription parent existant réussie !');
      } else {
        alert('Veuillez remplir l\'email et le nom du parent existant');
      }
    } else if (this.parentChoice === 'new') {
      // Vérifier les champs du nouveau parent
      const newParentData = {
        nom: this.studentForm.get('newParentNom')?.value,
        prenom: this.studentForm.get('newParentPrenom')?.value,
        tele: this.studentForm.get('newParentTele')?.value,
        email: this.studentForm.get('newParentEmail')?.value,
        nombreEnfants: this.studentForm.get('nombreEnfants')?.value
      };
      
      if (newParentData.nom && newParentData.prenom && newParentData.tele && 
          newParentData.email && newParentData.nombreEnfants) {
        console.log('Inscription nouveau parent:', newParentData);
        alert('Inscription nouveau parent réussie !');
      } else {
        alert('Veuillez remplir tous les champs du nouveau parent');
      }
    } else {
      alert('Veuillez d\'abord choisir le type de compte parent');
    }
  }
} 