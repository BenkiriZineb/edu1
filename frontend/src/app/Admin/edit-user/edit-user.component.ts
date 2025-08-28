import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {
    nom: '',
    prenom: '',
    email: '',
    role: '',
    actif: true,
    datedenaissance: '',
    sexe: '',
    adresse: ''
  };

private apiUrl = 'http://localhost:8080/api/list_utilisateur/edit';

  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }
  cancel(): void {
  this.router.navigate(['/list_utilisateurs']);

}


  loadUser(): void {
    this.http.get(`${this.apiUrl}/${this.userId}`).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error("Erreur lors du chargement de l'utilisateur", err)
    });
  }

  updateUser(): void {
    this.http.put(`${this.apiUrl}/${this.userId}`, this.user).subscribe({
      next: () => {
        alert('Utilisateur modifié avec succès');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error("Erreur lors de la modification", err);
        alert("Échec de la mise à jour");
      }
    });
  }
}
