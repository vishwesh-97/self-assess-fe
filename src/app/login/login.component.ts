import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiHandlerService } from '../service/api-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errors: string[];
  submitted: boolean = false;
  loading: boolean = false;
  userData: any  = {};
  cookieExists: boolean;

  constructor(private router: Router,
    private  http: ApiHandlerService, 
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private titleService: Title,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cookieExists = this.cookieService.check('Token');

    if (this.cookieExists) {
      this.router.navigateByUrl('/assessment');
    }

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    this.submitted = true;
    this.loading = true;
    const requestBody = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password,
    };
    this.http.post('login', requestBody).subscribe((res) => {
      this.setConfig(res);
    }, (error) => {
        this.submitted = false;
        this.loading = false;
        this.errors = [];
        const errorFields = Object.keys(error.error);
        for (let i = 0; i < errorFields.length; i++) {
          this.errors.push(error.error[errorFields[i]]);
        }
        this.toastr.error(this.errors[0], 'Login failed!', {
          timeOut: 5000,
        });
    });
  }

  setConfig(res) {
    let token = res.token;
    this.cookieService.set('Token', token, 1, '/')
    localStorage.setItem('user_data', JSON.stringify(res.user));
    this.router.navigateByUrl('/assessment');
  }

}
