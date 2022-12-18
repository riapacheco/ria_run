import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideDownUp } from './constants/animations.constants';
import { BREAKPOINT_VALUE } from './enums/breakpoint.enums';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideDownUp ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  topNavClass = {
    desktop: 'top-nav black',
    mobile: 'top-nav mobile',
    isShowing: true
  };

  showsBanner!: boolean;
  bannerLink = 'https://ribeets.studio';

  banner = {
    key: 'Banner State',
    value: 'multiverse and rogue planet'
  };
  isMobile!: boolean;
  @ViewChild('scrollDiv') scrollDiv!: ElementRef;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
        if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
        else { this.isMobile = false; }
      })
    );
    if (this.router.url == '/terminal') { this.topNavClass.isShowing = false; }
    setTimeout(() => {
      // this.showsBanner = true;
      this.checkStorage();
    }, 500);
  }
  ngAfterViewInit() {
    document.body.scroll(0,0);
  }
  ngOnDestroy() {}

  onActivate() {
    document.body.scroll(0,0);
    switch (true) {
      case this.router.url == '/terminal':
        this.topNavClass = {
          desktop: '',
          mobile: '',
          isShowing: false
        }
        break;
      case this.router.url == '/main':
        this.topNavClass = {
          desktop: 'top-nav black',
          mobile: 'top-nav black mobile',
          isShowing: true,
        }
        break;
      case this.router.url == '/about-me':
        this.topNavClass = {
          desktop: 'top-nav canary',
          mobile: 'top-nav canary mobile',
          isShowing: true
        };
        break;
      case this.router.url == '/user-interface':
        this.topNavClass = {
          desktop: 'top-nav canary',
          mobile: 'top-nav canary mobile',
          isShowing: true
        }
        break;
      case this.router.url == '/contact':
        this.topNavClass = {
          desktop: 'top-nav white',
          mobile: 'top-nav white mobile',
          isShowing: true
        };
        break;
      case this.router.url == '/apps':
        this.topNavClass.isShowing = false;
        break;
    }
  }

  checkStorage() {
    // IF value does not match key
    // OR there is no key
    if (localStorage.getItem(this.banner.key) !== this.banner.value || !localStorage.getItem(this.banner.key)) {
      // THEN trigger banner
      this.showsBanner = true;
      // SET storage
      localStorage.setItem(this.banner.key, this.banner.value);
    }
    else { this.showsBanner = false; }
  }
  onBannerClick(action: string) {
    switch (action) {
      case 'dismiss':
        this.showsBanner = false;
        break;
      case 'confirm':
        window.open(this.bannerLink);
        this.showsBanner = false;
        break;
    }
  }

}
