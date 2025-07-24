import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Eleve, Enseignant, Parent } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Données simulées pour la démo
  private users: User[] = [
    {
      id: 1,
      username: 'eleve1',
      email: 'eleve1@ecole.com',
      role: 'eleve',
      nom: 'Dupont',
      prenom: 'Marie',
      niveau: '6ème',
      classe: '6A'
    } as Eleve,
    {
      id: 2,
      username: 'prof1',
      email: 'prof1@ecole.com',
      role: 'enseignant',
      nom: 'Martin',
      prenom: 'Jean',
      matieres: ['Mathématiques', 'Physique'],
      classes: ['6A', '6B', '5A']
    } as Enseignant,
    {
      id: 3,
      username: 'parent1',
      email: 'parent1@email.com',
      role: 'parent',
      nom: 'Durand',
      prenom: 'Sophie',
      enfants: [
        {
          id: 1,
          username: 'eleve1',
          email: 'eleve1@ecole.com',
          role: 'eleve',
          nom: 'Dupont',
          prenom: 'Marie',
          niveau: '6ème',
          classe: '6A'
        } as Eleve
      ]
    } as Parent
  ];

  constructor() {
    // Vérifier s'il y a un utilisateur stocké dans le localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string, role: string): boolean {
    const user = this.users.find(u => 
      u.username === username && 
      u.role === role
    );

    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
} 