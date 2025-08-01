import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Informations personnelles
  lastName = '';
  firstName = '';
  fatherName = '';
  birthDate = '';
  gender = '';
  birthPlace = '';
  nationality = '';

  // Informations de contact
  phone = '';
  phoneFixed = '';
  email = '';
  parentEmail = '';

  // Adresse au Maroc
  region = '';
  city = '';
  district = '';
  postalCode = '';
  fullAddress = '';

  // Informations académiques
  educationLevel = '';
  schoolYear = '';
  grade = '';
  branch = '';

  // Compte utilisateur
  role = '';
  username = '';
  password = '';
  confirmPassword = '';

  // Conditions et consentement
  acceptTerms = false;
  acceptPrivacy = false;
  acceptNewsletter = false;

  onSubmit() {
    // Validation des champs requis
    if (!this.validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires et accepter les conditions.');
      return;
    }

    // Validation du mot de passe
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    if (this.password.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Validation de l'email
    if (!this.validateEmail(this.email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }

    // Validation du téléphone marocain
    if (!this.validateMoroccanPhone(this.phone)) {
      alert('Veuillez entrer un numéro de téléphone marocain valide (format: 0612345678).');
      return;
    }

    // Simulation de création de compte
    console.log('Données du formulaire:', {
      lastName: this.lastName,
      firstName: this.firstName,
      fatherName: this.fatherName,
      birthDate: this.birthDate,
      gender: this.gender,
      birthPlace: this.birthPlace,
      nationality: this.nationality,
      phone: this.phone,
      phoneFixed: this.phoneFixed,
      email: this.email,
      parentEmail: this.parentEmail,
      region: this.region,
      city: this.city,
      district: this.district,
      postalCode: this.postalCode,
      fullAddress: this.fullAddress,
      educationLevel: this.educationLevel,
      schoolYear: this.schoolYear,
      grade: this.grade,
      branch: this.branch,
      role: this.role,
      username: this.username,
      password: this.password,
      acceptTerms: this.acceptTerms,
      acceptPrivacy: this.acceptPrivacy,
      acceptNewsletter: this.acceptNewsletter
    });

    alert('Compte créé avec succès ! Bienvenue sur la plateforme éducative marocaine.');
    
    // Réinitialiser le formulaire
    this.resetForm();
  }

  private validateForm(): boolean {
    return !!(
      this.lastName &&
      this.firstName &&
      this.fatherName &&
      this.birthDate &&
      this.gender &&
      this.birthPlace &&
      this.nationality &&
      this.phone &&
      this.email &&
      this.region &&
      this.city &&
      this.district &&
      this.postalCode &&
      this.fullAddress &&
      this.educationLevel &&
      this.schoolYear &&
      this.grade &&
      this.role &&
      this.username &&
      this.password &&
      this.confirmPassword &&
      this.acceptTerms &&
      this.acceptPrivacy
    );
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateMoroccanPhone(phone: string): boolean {
    // Format marocain: 06xxxxxxxx ou 05xxxxxxxx
    const phoneRegex = /^(06|05)\d{8}$/;
    return phoneRegex.test(phone);
  }

  private resetForm(): void {
    this.lastName = '';
    this.firstName = '';
    this.fatherName = '';
    this.birthDate = '';
    this.gender = '';
    this.birthPlace = '';
    this.nationality = '';
    this.phone = '';
    this.phoneFixed = '';
    this.email = '';
    this.parentEmail = '';
    this.region = '';
    this.city = '';
    this.district = '';
    this.postalCode = '';
    this.fullAddress = '';
    this.educationLevel = '';
    this.schoolYear = '';
    this.grade = '';
    this.branch = '';
    this.role = '';
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.acceptTerms = false;
    this.acceptPrivacy = false;
    this.acceptNewsletter = false;
  }
}
