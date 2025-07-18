import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  annee!: string;
  matiere!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.annee = this.route.snapshot.paramMap.get('annee') || '';
    this.matiere = this.route.snapshot.paramMap.get('matiere') || '';
  }
}
