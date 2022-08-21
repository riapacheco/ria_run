import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IIFrame } from 'src/app/components/iframe/iframe.component';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IframeService } from 'src/app/services/iframe.service';


@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit, OnDestroy {

  /* ---------------------------- IFRAME COMPONENT ---------------------------- */
  config = {
    indicatorCards: {
      isShowing: true,
      defaultClass: 'iframe-item reverse',
      mobileClass: 'iframe-item mobile'
    }
  }
  embedList: IIFrame[] = [];
  wrapper = {
    width: '100%',
    height: '600px'
  };
  /* ---------------------------- TOP NAV COMPONENT --------------------------- */
  navClass = {
    desktop: 'top-nav canary',
    mobile: 'top-nav canary mobile'
  };

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private service: IframeService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
    this.sub.add(this.loadData());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /* ------------------------------ DEVICE CHECK ------------------------------ */
  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  /* -------------------------------- GET DATA -------------------------------- */
  private loadData() {
    this.service.getAllIframes().then((res: any) => {
      this.embedList = res;
    })
  }
}
