import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiHandlerService } from 'src/app/service/api-handler.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  assessmentList: any = null;
  toEmail: any = null;
  emailAssessmentId: number = null;

  @ViewChild('closeModalBtn') closeBtn: ElementRef;

  constructor(private elementRef: ElementRef,
              private http: ApiHandlerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAssessmentList();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightgray';
  }

  getAssessmentList() {
    this.http.get('all-assessments').subscribe(res => {
      this.assessmentList = res;
      console.log(res)
    }, (err) => {
      console.log(err);
    })
  }

  downloadReport(assessment_id){
    if (assessment_id){
      this.http.getFile(`generate-report/${assessment_id}`).subscribe(res => {
        var url = window.URL.createObjectURL(res);
        var a = document.createElement('a');
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();
      }, err => {
        console.log(err);
      })
    }
  }

  shareReport(){
    debugger;
    if (this.emailAssessmentId && this.toEmail){
      this.http.get(`share-report/${this.emailAssessmentId}`, {"email": this.toEmail}).subscribe(res => {
        console.log(res);
        this.closeModal();
        this.closeBtn.nativeElement.click();
        this.toastr.success('', 'Email sent!', {
          timeOut: 3000,
        });
      }, err => {
        console.log(err);
      });
    }
  }

  setCurrentAssessment(id){
    this.emailAssessmentId = id;
  }

  closeModal(){
    this.toEmail = null;
    this.emailAssessmentId = null;
  }

}
