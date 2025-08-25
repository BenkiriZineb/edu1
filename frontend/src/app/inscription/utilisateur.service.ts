// src/app/inscription/utilisateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur, UserRole, StatutComptes } from './utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  // Récupérer tous les utilisateurs (cohérent avec votre backend)
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    console.log('🔄 Service: Récupération de tous les utilisateurs...');
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/list_utilisateur/utilisateurs`, this.getHttpOptions());
  }

  // Créer un nouvel utilisateur
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    console.log('🔄 Service: Création utilisateur...', utilisateur);
    return this.http.post<Utilisateur>(`${this.apiUrl}/utilisateurs`, utilisateur, this.getHttpOptions());
  }

  // Récupérer un utilisateur par ID
  getUtilisateurById(id: number): Observable<Utilisateur> {
    console.log('🔄 Service: Récupération utilisateur par ID:', id);
    return this.http.get<Utilisateur>(`${this.apiUrl}/utilisateurs/${id}`, this.getHttpOptions());
  }

  // Mettre à jour un utilisateur
  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    console.log('🔄 Service: Mise à jour utilisateur:', id, utilisateur);
    return this.http.put<Utilisateur>(`${this.apiUrl}/utilisateurs/${id}`, utilisateur, this.getHttpOptions());
  }

  // Mettre à jour le statut d'un utilisateur
  updateUserStatus(id: number, statut: StatutComptes): Observable<any> {
    console.log('🔄 Service: Mise à jour statut utilisateur:', id, statut);
    return this.http.patch(`${this.apiUrl}/utilisateurs/${id}/status`, { statutCompte: statut }, this.getHttpOptions());
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    console.log('🔄 Service: Suppression utilisateur:', id);
    return this.http.delete(`${this.apiUrl}/utilisateurs/${id}`, this.getHttpOptions());
  }

  // Rechercher des utilisateurs par critères
  searchUtilisateurs(criteres: any): Observable<Utilisateur[]> {
    console.log('🔄 Service: Recherche utilisateurs:', criteres);
    return this.http.post<Utilisateur[]>(`${this.apiUrl}/utilisateurs/search`, criteres, this.getHttpOptions());
  }
}