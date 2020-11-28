import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentManagementComponent } from './assessment-management/assessment-management.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartAssessmentComponent } from './start-assessment/start-assessment.component';
import { AssessmentComponent } from './assessment.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [AssessmentComponent, AssessmentManagementComponent, StartAssessmentComponent, HistoryComponent],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AssessmentModule { }
