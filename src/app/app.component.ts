import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from './enums/breakpoint.enums';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  
  topNavClass = {
    desktop: 'top-nav black',
    mobile: 'top-nav mobile',
    isShowing: true
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
    }
  }
  
}
