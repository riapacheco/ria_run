import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit, OnDestroy {
  @Output() firstTabClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondTabClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() thirdTabClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() showsFirst = false;

  @Input() btn = {
    first: {
      label: 'Both',
      isActive: false,
    },
    second: {
      label: 'Product',
      isActive: false,
    },
    third: {
      label: 'Development',
      isActive: true
    }
  }

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onFirstTabClick(e: any) {
    if (e) { this.firstTabClick.emit('firstTab'); }
  }

  onSecondTabClick(e: any) {
    if (e) { this.secondTabClick.emit('secondTab'); }
  }

  onThirdTabClick(e: any) {
    if (e) { this.thirdTabClick.emit('thirdTab'); }
  }

  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
}
