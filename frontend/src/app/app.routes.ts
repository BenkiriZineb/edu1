








// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CoursesComponent } from './courses/courses.component';
import { MaterielComponent } from './materiel/materiels.component';
import { ProfileComponent } from './profile/profile.component';
import { UtileComponent } from './utile/utile.component';
import { AproposdenousComponent } from './aproposdenous/aproposdenous.component';
import { EcoleComponent } from './ecole/ecole.component';
import {ReferencesComponent} from './references/references.component';
import { LoginComponent } from './login/login.component';
import { DashboardEleveComponent } from './dashboard-eleve/dashboard-eleve.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { DashboardParentComponent } from './dashboard-parent/dashboard-parent.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeAComponent } from './Admin/homeAdmin/homeA.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'calendrier', component: CalendarComponent },
  { path: 'ecole', component: EcoleComponent },
  {path: 'login',component: LoginComponent},
  { path: 'subscription', component: SubscriptionComponent },




////admin routes

/*{ 
    path: 'admin', 
    component: AdminLayoutComponent,  // Layout avec navbar/sidebar admin
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      
      // Gestion des utilisateurs
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/edit/:id', component: UserFormComponent },
      
      // Inscription spécifique admin
      { path: 'inscription', component: AdminInscriptionComponent }, 
      
      // Autres routes admin
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }
   */ 

  {path: 'list_utilisateurs', component: HomeAComponent },



  { path: 'inscription', component: InscriptionComponent },
















  { path: 'dashboard-eleve', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/cours', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/notes', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/progression', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/quiz', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/resultats', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/messages', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/notifications', component: DashboardEleveComponent },
  { path: 'dashboard-eleve/profile', component: DashboardEleveComponent },
  
  { path: 'dashboard-enseignant', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/cours', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/cours/ajouter', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/documents', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/notes', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/notes/ajouter', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/statistiques', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/quiz', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/quiz/creer', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/quiz/resultats', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/classes', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/eleves', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/suivi', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/messages', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/notifications', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/annonces', component: DashboardEnseignantComponent },
  { path: 'dashboard-enseignant/profile', component: DashboardEnseignantComponent },
  
  { path: 'dashboard-parent', component: DashboardParentComponent },
  { path: 'dashboard-parent/enfants', component: DashboardParentComponent },
  { path: 'dashboard-parent/progression', component: DashboardParentComponent },
  { path: 'dashboard-parent/notes', component: DashboardParentComponent },
  { path: 'dashboard-parent/cours', component: DashboardParentComponent },
  { path: 'dashboard-parent/devoirs', component: DashboardParentComponent },
  { path: 'dashboard-parent/absences', component: DashboardParentComponent },
  { path: 'dashboard-parent/messages', component: DashboardParentComponent },
  { path: 'dashboard-parent/notifications', component: DashboardParentComponent },
  { path: 'dashboard-parent/contact', component: DashboardParentComponent },
  { path: 'dashboard-parent/activites', component: DashboardParentComponent },
  { path: 'dashboard-parent/evenements', component: DashboardParentComponent },
  { path: 'dashboard-parent/calendrier', component: DashboardParentComponent },
  { path: 'dashboard-parent/profile', component: DashboardParentComponent },

  { path: 'calendrier/:level', component: SubjectsComponent },
  { path: 'calendrier/:level/:matiere', component: CoursesComponent },
  { path: 'matieres/:niveau', component: SubjectsComponent },
  { path: 'utile', component: UtileComponent },
  { path: 'aproposdenous', component: AproposdenousComponent },
  {path: 'references', component: ReferencesComponent },

  // **TOUJOURS EN DERNIER**
  { path: '**', redirectTo: '', pathMatch: 'full' }
];