import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  script0: any;
  script1: any;
  script2: any;
  script3: any;
  script4: any;
  script5: any;
  script6: any;
  script7: any;
  script8: any;
  script9: any;
  script10: any;

  constructor(private cookieService: CookieService,
    private router: Router,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) { }


  ngAfterViewInit() {
    setTimeout(() => {
      this.loadNextScript0();
    }, 1000)
  }

  ngOnInit(): void {
  }

  loadNextScript0(){
    this.script0 = this.renderer2.createElement('script');
    this.script0.type = 'text/javascript';
    this.script0.onload = this.loadNextScript6.bind(this);
    this.script0.async = 'async';
    this.script0.defer = true;
    this.script0.src = '../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
    this.renderer2.appendChild(this._document.head, this.script0);
  }

  loadNextScript6(){
    this.script7 = this.renderer2.createElement('script');
    this.script7.type = 'text/javascript';
    this.script7.onload = this.loadNextScript8.bind(this);
    this.script7.async = 'async';
    this.script7.defer = true;
    this.script7.src = '../../assets/vendor/jquery.easing/jquery.easing.min.js';
    this.renderer2.appendChild(this._document.head, this.script7);
  }

  loadNextScript(){
    this.script1 = this.renderer2.createElement('script');
    this.script1.type = 'text/javascript';
    this.script1.onload = this.loadNextScript1.bind(this);
    this.script1.async = 'async';
    this.script1.defer = true;
    this.script1.src = '../../assets/vendor/waypoints/jquery.waypoints.min.js';
    this.renderer2.appendChild(this._document.head, this.script1);
  }

  loadNextScript1(){
    this.script2 = this.renderer2.createElement('script');
    this.script2.type = 'text/javascript';
    this.script2.onload = this.loadNextScript2.bind(this);
    this.script2.async = 'async';
    this.script2.defer = true;
    this.script2.src = '../../assets/vendor/counterup/counterup.min.js';
    this.renderer2.appendChild(this._document.head, this.script2);
  }
  loadNextScript2(){
    this.script3 = this.renderer2.createElement('script');
    this.script3.type = 'text/javascript';
    this.script3.onload = this.loadNextScript3.bind(this);
    this.script3.async = 'async';
    this.script3.defer = true;
    this.script3.src = '../../assets/vendor/isotope-layout/isotope.pkgd.min.js';
    this.renderer2.appendChild(this._document.head, this.script3);
  }
  loadNextScript3(){
    this.script4 = this.renderer2.createElement('script');
    this.script4.type = 'text/javascript';
    this.script4.onload = this.loadNextScript4.bind(this);
    this.script4.async = 'async';
    this.script4.defer = true;
    this.script4.src = '../../assets/vendor/venobox/venobox.min.js';
    this.renderer2.appendChild(this._document.head, this.script4);
  }
  loadNextScript4(){
    this.script5 = this.renderer2.createElement('script');
    this.script5.type = 'text/javascript';
    this.script5.onload = this.loadNextScript5.bind(this);
    this.script5.async = 'async';
    this.script5.defer = true;
    this.script5.src = '../../assets/vendor/owl.carousel/owl.carousel.min.js';
    this.renderer2.appendChild(this._document.head, this.script5);
  }

  loadNextScript5(){
    this.script6 = this.renderer2.createElement('script');
    this.script6.type = 'text/javascript';
    this.script6.onload = this.loadNextScript7.bind(this);
    this.script6.async = 'async';
    this.script6.defer = true;
    this.script6.src = '../../assets/vendor/aos/aos.js';
    this.renderer2.appendChild(this._document.head, this.script6);
  }

  loadNextScript7(){
    this.script8 = this.renderer2.createElement('script');
    this.script8.type = 'text/javascript';
    // this.script8.onload = this.loadNextScript8.bind(this);
    this.script8.async = 'async';
    this.script8.defer = true;
    this.script8.src = '../../assets/js/main.js';
    this.renderer2.appendChild(this._document.head, this.script8);
  }
  loadNextScript8(){
    this.script9 = this.renderer2.createElement('script');
    this.script9.type = 'text/javascript';
    this.script9.onload = this.loadNextScript.bind(this);
    this.script9.async = 'async';
    this.script9.defer = true;
    this.script9.src = '../../assets/vendor/php-email-form/validate.js';
    this.renderer2.appendChild(this._document.head, this.script9);
  }
  // loadNextScript9(){
  //   this.script10 = this.renderer2.createElement('script');
  //   this.script10.type = 'text/javascript';
  //   // this.script10.onload = this.loadNextScript7.bind(this);
  //   this.script10.async = 'async';
  //   this.script10.defer = true;
  //   this.script10.src = '../../assets/vendor/jquery/jquery.min.js';
  //   this.renderer2.appendChild(this._document.head, this.script10);
  // }

  logOut(){
    this.cookieService.delete('Token', '/');
    localStorage.removeItem('user_data');
    this.router.navigateByUrl('/login');
  }

}
