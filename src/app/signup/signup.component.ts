import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiHandlerService } from '../service/api-handler.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  cookieExists: boolean;

  user_data: any = {};

  signupForm: FormGroup;
  loading: boolean = false;

  errors: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private http: ApiHandlerService,
    private elementRef: ElementRef,
    private router: Router,
    private cookieService: CookieService,
    private titleService: Title,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { 
    
    this.cookieExists = this.cookieService.check('Token');

    if (this.cookieExists) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp(){
    // calling signup api
    this.loading = true;
    let requestBody = {
      'first_name': this.signupForm.value.first_name,
      'last_name': this.signupForm.value.last_name,
      'email': this.signupForm.value.email,
      'password': this.signupForm.value.password
    }
    this.http.post('sign-up', requestBody).subscribe(res => {
      // console.log(res);
      this.user_data = res;
      this.toastr.success('', 'Signed up successfully!', {
        timeOut: 5000,
      });
      this.router.navigateByUrl('/login');
    }, (err) => {
      this.loading = false;
      console.log(err);
      this.errors = [];
      const errorFields = Object.keys(err.error);
      for (let i = 0; i < errorFields.length; i++) {
        this.errors.push(err.error[errorFields[i]]);
      }
      this.toastr.error(this.errors[0], 'Signup failed!', {
        timeOut: 5000,
      });
    });
  }

}
