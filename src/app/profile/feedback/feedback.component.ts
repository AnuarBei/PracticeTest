import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {Message} from '../profile.module';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, AfterViewChecked {
  messages: Message[] = [];
  message: Message = {
    answer: false,
    body: null
  };

  constructor(private profileService: ProfileService,
              public appService: AppService) { }

  ngOnInit(): void {
    this.getMyMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const div = document.getElementById('messages');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }

  getMyMessages() {
    this.profileService.getMyMessages().subscribe((data: any) => {
      this.messages = data.results;
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (!this.message.body) {
      return;
    }
    this.messages.push({
      ...this.message,
      date_created: new Date().toString()
    });
    const message = { ...this.message };
    this.message.body = null;

    this.profileService.createMessage(message).subscribe(response => {
      this.getMyMessages();
    });
  }
}
