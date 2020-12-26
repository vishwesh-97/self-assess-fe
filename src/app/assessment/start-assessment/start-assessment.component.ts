import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { partition } from 'rxjs';
import { ApiHandlerService } from 'src/app/service/api-handler.service';

@Component({
  selector: 'app-start-assessment',
  templateUrl: './start-assessment.component.html',
  styleUrls: ['./start-assessment.component.scss']
})
export class StartAssessmentComponent implements OnInit, AfterViewInit {

  assessmentData: any = {};
  userData: any = null;

  queList: any = [];
  currentQueIndex: number;
  currentQue: any = null;

  selectedAnswer: any = 0;

  showFinish: boolean = false;

  currentDayCount: number = null;
  today: any = null;

  constructor(private elementRef: ElementRef,
    private route: ActivatedRoute,
    private http: ApiHandlerService,
    private router: Router,
    private toastr: ToastrService) { 
      this.userData = JSON.parse(localStorage.getItem("user_data"));
    }

  ngOnInit(): void {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.assessmentData.id = this.route.snapshot.params.id;
      this.getAssessmentData(this.assessmentData.id);
    }
    this.today = new Date();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightgray';
  }

  getAssessmentData(id){
    this.http.get(`user-assessment/${id}`).subscribe(res => {
      console.log(res);
      this.assessmentData = res;
      this.currentDayCount = parseInt(this.assessmentData.completed_days) + 1;
      console.log("daycount:",this.currentDayCount)
      this.getQuestions(this.assessmentData.id);
    }, err => {
      console.log(err);
    })
  }

  getQuestions(id){
    if (this.userData && this.userData.user_id && id){
      let requestBody = {
        'user': this.userData.user_id,
        'assessment': this.assessmentData.id
      }
      // debugger;
      this.http.post('today-questions', requestBody).subscribe(res => {
        console.log(res);
        this.queList = res;
        this.setQue(this.queList);
      }, err => {
        console.log(err);
        if (err.error.submitted_msg){
          this.toastr.error(err.error.submitted_msg[0], 'Error!', {
            timeOut: 5000,
          });
        }
      });
    }
  }

  setQue(queList){
    if (queList.length > 0){
      this.currentQueIndex = 0;
      this.currentQue = queList[this.currentQueIndex];
      if (queList.length == 1){
        this.showFinish = true;
      }
    } else {
      this.toastr.error('You have already submitted Answers for today!', 'Error!', {
        timeOut: 5000,
      });
    }
  }

  saveAnswer(finish:boolean = false){
    // if(parseInt(this.selectedAnswer) != 0 && this.currentQue.id){

    // }
    let now = new Date();
    let requestBody = {
      'user': this.userData.user_id,
      'assessment': this.assessmentData.id,
      'question': this.currentQue.id,
      'answer': parseInt(this.selectedAnswer),
      'answer_datetime': now
    }
    debugger;
    this.http.post('user-answer', requestBody).subscribe(res => {
      console.log(res);
      if (finish){
        this.updateAssessment(this.assessmentData.id);
        // this.goToAssessmentList();
      } else{
        // changing question on successfully saving answer
        this.currentQueIndex = this.currentQueIndex + 1;
        this.currentQue = this.queList[this.currentQueIndex];
        this.selectedAnswer = 0;
        if (this.currentQueIndex === (this.queList.length - 1)){
          this.showFinish = true;
        }
      }
    }, err => {
      console.log(err);
    });
  }

  updateAssessment(id){
    let days = parseInt(this.assessmentData.completed_days) + 1;
    let requestBody = {
      'completed_days': days
    }
    debugger;
    this.http.patch(`user-assessment/${id}`, requestBody).subscribe(res => {
      console.log(res);
      this.toastr.success('You assessment is submitted.', 'Submitted!', {
        timeOut: 5000,
      });
      this.goToAssessmentList();
    }, err => {
      console.log(err);
    })
  }

  goToAssessmentList(){
    this.router.navigateByUrl('/assessment');
  }

  changeQue(){
    // funtion to change current displayed question
  }

}
