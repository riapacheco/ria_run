import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideDownUp } from 'src/app/constants/animations.constants';
import { TOP_NAV } from 'src/app/constants/size.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  animations: [slideDownUp]
})
export class TopNavComponent implements AfterViewInit {
  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() navClass = {
    desktop: 'top-nav',
    mobile: 'top-nav mobile'
  }
  @Input() topNav = TOP_NAV.height;
  isAtTopView = true;
  isMobile!: boolean;

  @ViewChild('topDiv') topDiv!: ElementRef;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public sidebar: SidebarService
  ) { }

  ngAfterViewInit() {
    this.sub.add(this.checkDevice());
  }

  checkDevice() {
    setTimeout(() => {
      this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
        if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
        else { this.isMobile = false; }
      })
    }, 100);
  }

  onTerminalClick(e: any) {
    if (e) { this.router.navigateByUrl('/terminal'); }
  }

  onLogoClick(e: any) {
    if (e) {
      this.router.navigateByUrl('/main');
    }
    if (this.router.url == '/main') {
      setTimeout(() => {
        this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  onSidebarOpen() {
    this.sidebar.openSidebar();
  }
  onSidebarClose() {
    this.sidebar.closeSidebar();
  }
  /* ---------------------------- LISTEN FOR SCROLL --------------------------- */
  @HostListener('body:scroll', ['$event'])
  public onScroll(): void {
    const currentCoords = window.pageYOffset;
    const topScroll = document.body.scrollTop;

    if (currentCoords === topScroll) { this.isAtTopView = true; }
    else { this.isAtTopView = false; }
  }
}
