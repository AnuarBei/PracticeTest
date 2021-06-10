import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {AppService} from '../../../app.service';
import {User} from '../../profile.module';
import {ProfileService} from '../../profile.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {
  @Output() finished = new EventEmitter<boolean>();
  languages = [
    { text: 'Русский', value: 'ru' },
    { text: 'Казахский', value: 'kk' }
  ];
  user: User;

  constructor(public appService: AppService,
              private profileService: ProfileService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.user = { ...this.appService.user };
  }

  updateUser() {
    this.profileService.updateUser({
      id: this.user.id,
      phone: this.user.phone,
      lang: this.user.lang
    }).subscribe(() => {
      this.appService.user.phone = this.user.phone;
      this.appService.user.lang = this.user.lang;
      this.appService.language = this.user.lang;
      this.translate.use(this.user.lang);

      this.finished.emit(true);
    });
  }
}
