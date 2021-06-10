import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { MyCourse } from '../../training/training.module';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  showDialog = false;
  myCourses: MyCourse[];
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getMyCourses().subscribe((data: any) => {
      this.myCourses = data.results;
      //console.log(data.results);
    });
  }

  getResult(event) {
    //console.log(event);
  }
}
