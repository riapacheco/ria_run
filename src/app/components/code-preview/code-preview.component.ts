import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss']
})
export class CodePreviewComponent implements OnInit, OnDestroy {
  @Input() componentType = '';
  cards = [
    {
      icon: 'account_balance',
      mainLabel: 'Checking',
      amount: '21,692',
      bottomLabel: 'Last 30 Days',
    },
    {
      icon: 'savings',
      mainLabel: 'Savings',
      amount: '42,304',
      bottomLabel: 'Last 30 Days',
    },
    {
      icon: 'payments',
      mainLabel: 'Bills',
      amount: '1,345',
      bottomLabel: 'Last 30 Days',
    }
  ];

  // Responsive action bar
  sliderWidth = 550;
  mobileSliderWidth = 400;
  mockMobile = false;
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

  private checkViewport() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
  onWidthChange(data: any){
    // console.log(data);
    if (data <= 500) {
      this.mockMobile = true;
    } else {
      this.mockMobile = false;
    }
  }
}
