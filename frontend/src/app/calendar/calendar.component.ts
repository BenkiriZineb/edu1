// src/app/calendar/calendar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule]
})
export class CalendarComponent {
  selectedLevel: string | null = null;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  selectLevel(level: string) {
    this.selectedLevel = level;
  }

  clearSelection() {
    this.selectedLevel = null;
  }

  goToSubjects(level: string) {
    this.router.navigate(['/calendrier', level]);
  }
}
