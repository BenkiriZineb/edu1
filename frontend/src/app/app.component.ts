import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
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

  navigateToHome() {
    this.isMenuVisible = false;
    this.router.navigate(['/']);
  }

  navigateToSubscription() {
    this.isMenuVisible = false;
    this.router.navigate(['/subscription']);
  }
}
