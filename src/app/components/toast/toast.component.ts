import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sidebarOpenClose, slideDownUp, slideLeftAnimation } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [ slideLeftAnimation ]
})
export class ToastComponent implements OnInit, OnDestroy {
  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver,
    public toast: ToastService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.observeBreakpoints());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private observeBreakpoints() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
}
