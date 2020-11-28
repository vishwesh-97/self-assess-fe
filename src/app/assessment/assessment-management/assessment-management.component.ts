import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiHandlerService } from 'src/app/service/api-handler.service';

@Component({
  selector: 'app-assessment-management',
  templateUrl: './assessment-management.component.html',
  styleUrls: ['./assessment-management.component.scss']
})
export class AssessmentManagementComponent implements OnInit, AfterViewInit {

  assessmentList: any = null;
  newAssessmentForm: FormGroup;
  loading: boolean = false;
  userData: any = null;
  tweetList: any = null;

  @ViewChild('closeModalBtn') closeBtn: ElementRef;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: ApiHandlerService,
    private titleService: Title,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAssessmentList();
    this.getTweets();
    this.newAssessmentForm = this.formBuilder.group({
      name: [null, Validators.required],
      days: [null, Validators.required]
    });
    this.userData = JSON.parse(localStorage.getItem("user_data"));
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightgray';
  }

  getAssessmentList() {
    this.http.get('all-assessments').subscribe(res => {
      this.assessmentList = res;
    }, (err) => {
      console.log(err);
    })
  }

  getTweets(){
    this.http.get('cbc-tweets').subscribe(res => {
      this.tweetList = res.tweets;
    })
  }

  addNew(){
    if (this.userData && this.userData.user_id){
      this.loading = true;
      let requestBody = {
        'user': this.userData.user_id,
        'name': this.newAssessmentForm.value.name,
        'total_days': this.newAssessmentForm.value.days,
        // 'start_datetime': ''
      }
      debugger;
      this.http.post('user-assessment', requestBody).subscribe(res => {
        console.log(res);
        // closing modal
        this.loading = false;
        this.closeBtn.nativeElement.click();
        this.toastr.success('', 'Assessment created!', {
          timeOut: 3000,
        });
        this.getAssessmentList();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
  }

  closeModal(){
    this.newAssessmentForm.reset();
  }
}
