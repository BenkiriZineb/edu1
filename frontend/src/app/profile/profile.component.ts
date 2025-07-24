import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  lastName = '';
  firstName = '';
  secondLastName = '';
  birthDate = '';
  gender = '';
  phone = '';
  email = '';
  citizenship = '';
  country = '';
  city = '';
  timezone = '';
  school = '';
  role = '';

  onSubmit() {
    alert('Inscription soumise !');
  }
}
