import { Component, OnInit } from '@angular/core';
import {Course} from '../profile.module';
import {ProfileService} from '../profile.service';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  courses: Course[];
  constructor(private profileService: ProfileService,
              private router: Router,
              public appService: AppService) { }

  ngOnInit(): void {
    this.profileService.getCourses().subscribe((data: any) => {
      this.courses = data.results;
    });
  }

  navigate(route) {
    this.router.navigate([route]);
  }
}
