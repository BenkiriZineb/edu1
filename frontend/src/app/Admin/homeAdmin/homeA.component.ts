// src/app/Admin/homeAdmin/homeA.component.ts - Version avec API
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarAdminComponent } from '../../Admin/navbarAdmin/navbarAdmin.component';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
  datedenaissance: string;
  sexe: string;
  adresse?: string;
  mdp?: string;
}

@Component({
  selector: 'app-home-a',
  standalone: true,
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarAdminComponent,
    HttpClientModule
  ]
})
export class HomeAComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  userRoles = ['ELEVE', 'PROFESSEUR', 'PARENT'];
  isLoading = true;
  errorMessage = '';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  
  // Filtres
  searchTerm = '';
  roleFilter = '';
  
  // Tri
  sortColumn = 'nom';
  isAsc = true;

  private apiUrl = 'http://localhost:8080/api/list_utilisateur/utilisateurs';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    let result = this.users.filter(user => 
      `${user.nom} ${user.prenom}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.roleFilter) {
      result = result.filter(user => user.role === this.roleFilter);
    }

    this.filteredUsers = result;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.sortTable(this.sortColumn);
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.isAsc = !this.isAsc;
    } else {
      this.sortColumn = column;
      this.isAsc = true;
    }

    this.filteredUsers.sort((a, b) => {
      const valA = a[column as keyof User];
      const valB = b[column as keyof User];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }

  

  confirmDelete(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.deleteUser(userId);
    }
  }

  deleteUser(userId: number): void {
    this.http.delete(`${this.apiUrl}/${userId}`)
      .subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.applyFilter();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }
   activateUserAccount(user: User): void {
    // Implémentation alternative pour activer un compte utilisateur
    this.http.patch(`${this.apiUrl}/${user.id}/activate`, {})
      .subscribe({
        next: (res) => {
          console.log("Compte activé", res);
          user.actif = true;
        },
        error: (err) => {
          console.error("Erreur lors de l'activation", err);
        }
      });
  }
  toggleUserStatus(userId: number, currentStatus: boolean): void {
  const newStatus = !currentStatus;
  this.http.put(`${this.apiUrl}/${userId}/etat?actif=${newStatus}`, {}, { responseType: 'text' })
    .subscribe({
      next: () => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.actif = newStatus;
        }
      },
      error: (error) => {
        console.error('Error updating user status:', error);
        this.errorMessage = 'Échec de la mise à jour du statut';
      }
    });
}
}