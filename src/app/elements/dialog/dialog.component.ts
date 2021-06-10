import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MustBeAnsweredAlertComponent } from '../../profile/courses/course/test/must-be-answered-alert/must-be-answered-alert.component';
import { TimeIsUpAlertComponent } from '../../profile/courses/course/test/time-is-up-alert/time-is-up-alert.component';
import { TestPassedAlertComponent } from '../../profile/courses/course/test/test-passed-alert/test-passed-alert.component';
import { PreTestRequiredAlertComponent } from '../../profile/courses/pre-test-required-alert/pre-test-required-alert.component';
import { SavedAlertComponent } from '../../profile/profile-info/saved-alert/saved-alert.component';
import { FillInRequiredFieldsAlertComponent } from '../../registration/fill-in-required-fields-alert/fill-in-required-fields-alert.component';
import { AreYouSureAlertComponent } from '../../header/are-you-sure-alert/are-you-sure-alert.component';
import { EmailIsRequiredComponent } from '../../registration/email-is-required/email-is-required.component';
import {ChooseCourseAlertComponent} from '../../training/choose-course-alert/choose-course-alert.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() alert = null;
  @Output() closeDialog = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    let dialogRef;
    if (this.alert === 'must-be-answered') {
      dialogRef = this.dialog.open(MustBeAnsweredAlertComponent);
    } else if (this.alert === 'time-is-up') {
      dialogRef = this.dialog.open(TimeIsUpAlertComponent);
    } else if (this.alert === 'test-passed') {
      dialogRef = this.dialog.open(TestPassedAlertComponent);
    } else if (this.alert === 'pre-test-required') {
      dialogRef = this.dialog.open(PreTestRequiredAlertComponent);
    } else if (this.alert === 'saved') {
      dialogRef = this.dialog.open(SavedAlertComponent);
    } else if (this.alert === 'fill-in-required-fields') {
      dialogRef = this.dialog.open(FillInRequiredFieldsAlertComponent);
    } else if (this.alert === 'are-you-sure') {
      dialogRef = this.dialog.open(AreYouSureAlertComponent);
    } else if (this.alert === 'email-is-required') {
      dialogRef = this.dialog.open(EmailIsRequiredComponent);
    } else if (this.alert === 'choose-course') {
      dialogRef = this.dialog.open(ChooseCourseAlertComponent);
    }

    dialogRef.afterClosed().subscribe(result => {
      this.closeDialog.emit(result);
    });
  }
}
