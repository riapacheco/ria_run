import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from './enums/breakpoint.enums';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  sliderWidth = 600;
  mockMobile = false;

  
  
  isMobile!: boolean;
  @ViewChild('scrollDiv') scrollDiv!: ElementRef;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
        if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
        else { this.isMobile = false; }
      })
    )
  }
  ngAfterViewInit() {
    document.body.scroll(0,0);
  }
  ngOnDestroy() {}

  onActivate() { document.body.scroll(0,0); }

  onWidthChange(data: any){
    // console.log(data);
    if (data <= 500) {
      this.mockMobile = true;
    } else {
      this.mockMobile = false;
    }
  }
  
}
