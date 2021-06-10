import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../profile.module';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }
}
