import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentManagementComponent } from './assessment-management/assessment-management.component';
import { AssessmentComponent } from './assessment.component';
import { HistoryComponent } from './history/history.component';
import { StartAssessmentComponent } from './start-assessment/start-assessment.component';


const routes: Routes = [
  {
    path: '',
    // component: AssessmentManagementComponent,
    component: AssessmentComponent,
    children:[
      {
        path: '',
        component: AssessmentManagementComponent
      },
      {
        path: 'start/:id',
        component: StartAssessmentComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      // {
      //   path: 'dashboard/:id',
      //   loadChildren: () => import('../../dashboard/dashboard.module')
      //     .then(m => m.DashboardModule),
      //   // canActivate: [AuthGuard],
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
