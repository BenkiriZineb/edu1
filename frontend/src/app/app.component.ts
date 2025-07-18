import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuVisible = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  navigateToCalendar() {
    this.isMenuVisible = false;
    this.router.navigate(['/calendrier']);
  }

  navigateToMateriel() {
    this.isMenuVisible = false;
    this.router.navigate(['/materiels']);
  }

  navigateToCourses() {
    this.isMenuVisible = false;
    this.router.navigate(['/calendrier/2025/math']);
  }

  navigateToStudents() {
    this.isMenuVisible = false;
    this.router.navigate(['/matieres/bac+1']);
  }

  navigateToStats() {
    this.isMenuVisible = false;
    this.router.navigate(['/']);
  }

  navigateToSettings() {
    this.isMenuVisible = false;
    this.router.navigate(['/']);
  }

  navigateToEcole() {
    this.isMenuVisible = false;
    this.router.navigate(['/ecole']);
  }

  navigateToUtiles() {
    this.isMenuVisible = false;
    this.router.navigate(['/utile']);
  }


  navigateToAPropos() {
    this.isMenuVisible = false;
    this.router.navigate(['/aproposdenous']);
  }

  navigateToProfile() {
    this.isMenuVisible = false;
    this.router.navigate(['/profile']);
  }
  navigateToReferences() {
    this.isMenuVisible = false;
    this.router.navigate(['/references']);
  }
}
