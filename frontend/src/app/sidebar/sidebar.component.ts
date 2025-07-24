import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() userRole: 'eleve' | 'enseignant' | 'parent' = 'eleve';
  
  menuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeMenu();
  }

  initializeMenu() {
    switch (this.userRole) {
      case 'eleve':
        this.menuItems = [
          {
            label: 'Tableau de bord',
            icon: '📊',
            route: '/dashboard-eleve'
          },
          {
            label: 'Mes cours',
            icon: '📚',
            children: [
              { label: 'Cours disponibles', icon: '📖', route: '/dashboard-eleve/cours' },
              { label: 'Mes notes', icon: '📝', route: '/dashboard-eleve/notes' },
              { label: 'Progression', icon: '📈', route: '/dashboard-eleve/progression' }
            ]
          },
          {
            label: 'Quiz & Exercices',
            icon: '🧩',
            children: [
              { label: 'Quiz disponibles', icon: '❓', route: '/dashboard-eleve/quiz' },
              { label: 'Mes résultats', icon: '✅', route: '/dashboard-eleve/resultats' }
            ]
          },
          {
            label: 'Communication',
            icon: '💬',
            children: [
              { label: 'Messages', icon: '📧', route: '/dashboard-eleve/messages' },
              { label: 'Notifications', icon: '🔔', route: '/dashboard-eleve/notifications' }
            ]
          },
          {
            label: 'Mon profil',
            icon: '👤',
            route: '/dashboard-eleve/profile'
          }
        ];
        break;

      case 'enseignant':
        this.menuItems = [
          {
            label: 'Tableau de bord',
            icon: '📊',
            route: '/dashboard-enseignant'
          },
          {
            label: 'Gestion des cours',
            icon: '📚',
            children: [
              { label: 'Mes cours', icon: '📖', route: '/dashboard-enseignant/cours' },
              { label: 'Ajouter un cours', icon: '➕', route: '/dashboard-enseignant/cours/ajouter' },
              { label: 'Documents', icon: '📄', route: '/dashboard-enseignant/documents' }
            ]
          },
          {
            label: 'Évaluation',
            icon: '📝',
            children: [
              { label: 'Notes des élèves', icon: '📊', route: '/dashboard-enseignant/notes' },
              { label: 'Ajouter une note', icon: '➕', route: '/dashboard-enseignant/notes/ajouter' },
              { label: 'Statistiques', icon: '📈', route: '/dashboard-enseignant/statistiques' }
            ]
          },
          {
            label: 'Quiz & Exercices',
            icon: '🧩',
            children: [
              { label: 'Mes quiz', icon: '❓', route: '/dashboard-enseignant/quiz' },
              { label: 'Créer un quiz', icon: '➕', route: '/dashboard-enseignant/quiz/creer' },
              { label: 'Résultats', icon: '✅', route: '/dashboard-enseignant/quiz/resultats' }
            ]
          },
          {
            label: 'Classes & Élèves',
            icon: '👥',
            children: [
              { label: 'Mes classes', icon: '🏫', route: '/dashboard-enseignant/classes' },
              { label: 'Liste des élèves', icon: '👨‍🎓', route: '/dashboard-enseignant/eleves' },
              { label: 'Suivi individuel', icon: '📋', route: '/dashboard-enseignant/suivi' }
            ]
          },
          {
            label: 'Communication',
            icon: '💬',
            children: [
              { label: 'Messages', icon: '📧', route: '/dashboard-enseignant/messages' },
              { label: 'Notifications', icon: '🔔', route: '/dashboard-enseignant/notifications' },
              { label: 'Annonces', icon: '📢', route: '/dashboard-enseignant/annonces' }
            ]
          },
          {
            label: 'Mon profil',
            icon: '👤',
            route: '/dashboard-enseignant/profile'
          }
        ];
        break;

      case 'parent':
        this.menuItems = [
          {
            label: 'Tableau de bord',
            icon: '📊',
            route: '/dashboard-parent'
          },
          {
            label: 'Mes enfants',
            icon: '👨‍👩‍👧',
            children: [
              { label: 'Vue d\'ensemble', icon: '👀', route: '/dashboard-parent/enfants' },
              { label: 'Progression', icon: '📈', route: '/dashboard-parent/progression' },
              { label: 'Notes détaillées', icon: '📝', route: '/dashboard-parent/notes' }
            ]
          },
          {
            label: 'Suivi scolaire',
            icon: '📚',
            children: [
              { label: 'Cours suivis', icon: '📖', route: '/dashboard-parent/cours' },
              { label: 'Devoirs', icon: '📋', route: '/dashboard-parent/devoirs' },
              { label: 'Absences', icon: '❌', route: '/dashboard-parent/absences' }
            ]
          },
          {
            label: 'Communication',
            icon: '💬',
            children: [
              { label: 'Messages des profs', icon: '📧', route: '/dashboard-parent/messages' },
              { label: 'Notifications', icon: '🔔', route: '/dashboard-parent/notifications' },
              { label: 'Contact école', icon: '📞', route: '/dashboard-parent/contact' }
            ]
          },
          {
            label: 'Activités',
            icon: '🎯',
            children: [
              { label: 'Activités récentes', icon: '📅', route: '/dashboard-parent/activites' },
              { label: 'Événements', icon: '🎉', route: '/dashboard-parent/evenements' },
              { label: 'Calendrier', icon: '📆', route: '/dashboard-parent/calendrier' }
            ]
          },
          {
            label: 'Mon profil',
            icon: '👤',
            route: '/dashboard-parent/profile'
          }
        ];
        break;
    }
  }

  toggleSubmenu(item: MenuItem) {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
