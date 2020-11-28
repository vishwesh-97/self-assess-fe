import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLogIn: boolean = false;

  constructor(private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.userLogIn = this.cookieService.check('Token');
    }

  ngOnInit(): void {
  }

  logOut(){
    this.cookieService.delete('Token', '/');
    localStorage.removeItem('user_data');
    localStorage.removeItem('integration_data');
    this.router.navigateByUrl('/login');
  }

  goToHistory(){
    this.router.navigateByUrl('/assessment/history');
  }


}
