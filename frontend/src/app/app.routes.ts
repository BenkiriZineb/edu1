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


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'calendrier', component: CalendarComponent },
  { path: 'ecole', component: EcoleComponent },

  { path: 'calendrier/:annee', component: SubjectsComponent },
  { path: 'calendrier/:annee/:matiere', component: CoursesComponent },
  { path: 'matieres/:niveau', component: SubjectsComponent },
  { path: 'utile', component: UtileComponent },
  { path: 'aproposdenous', component: AproposdenousComponent },
  {path: 'references', component: ReferencesComponent },

  // **TOUJOURS EN DERNIER**
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
