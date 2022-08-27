import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { DialogOverlayService } from 'src/app/services/dialog-overlay.service';

@Component({
  selector: 'app-dialog-overlay',
  templateUrl: './dialog-overlay.component.html',
  styleUrls: ['./dialog-overlay.component.scss'],
  
})
export class DialogOverlayComponent implements AfterViewInit, OnDestroy {

  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    public dialog: DialogOverlayService,
    private observer: BreakpointObserver
  ) { }

  ngAfterViewInit() {
    this.sub.add(this.checkDevice());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  onClose() { this.dialog.onClose(); }
}
