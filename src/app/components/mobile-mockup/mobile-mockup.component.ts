import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

@Component({
  selector: 'app-mobile-mockup',
  templateUrl: './mobile-mockup.component.html',
  styleUrls: ['./mobile-mockup.component.scss']
})
export class MobileMockupComponent implements OnInit, OnDestroy {

  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkViewport());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkViewport() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
}
