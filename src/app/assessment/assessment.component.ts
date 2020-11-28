import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment',
//   templateUrl: './login.component.html',
  styleUrls: ['./assessment.component.scss'],
  template: `
      <router-outlet></router-outlet>
    `,
})
export class AssessmentComponent {  
  constructor() {}
}
