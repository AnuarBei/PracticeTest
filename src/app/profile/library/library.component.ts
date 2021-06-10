import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {Book} from '../profile.module';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  library: Book[];
  constructor(private profileService: ProfileService,
              public appService: AppService) { }

  ngOnInit(): void {
    this.profileService.getLibrary({ limit: 999, offset: 0 }).subscribe((data: any) => {
      this.library = data.results;
    });
  }
}
