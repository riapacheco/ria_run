import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

export type TRiCreatedLink = 'store' | 'apps' | 'releaseNotes' | 'email' | 'home';
export interface IMouseoverData {
  topPosition: number;
  leftPosition: number;
  message: string;
}

@Component({
  selector: 'app-rc-top-nav',
  templateUrl: './rc-top-nav.component.html',
  styleUrls: ['./rc-top-nav.component.scss']
})
export class RcTopNavComponent implements OnInit, OnDestroy {
  @Output() logoClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() linkClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseoverEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseoutEvent: EventEmitter<any> = new EventEmitter<any>();

  mouseoverData: IMouseoverData = {
    topPosition: 0,
    leftPosition: 0,
    message: ''
  };

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkView());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private checkView() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  onLogoClick(e: any) {
    if (e) { this.logoClick.emit(true); }
  }

  onLinkClick(e: any, targetString: TRiCreatedLink) {
    if (e) { this.linkClick.emit(targetString); }
  }
  async onMouseover(e: any, targetString: TRiCreatedLink) {
    this.mouseoverData.topPosition = await e.clientY;
    this.mouseoverData.leftPosition = await e.clientX;
    const dataPopulated = await this.populateMessage(targetString);

    this.mouseoverEvent.emit(this.mouseoverData);
  }

  private populateMessage(messageData: string) {
    switch (messageData) {
      case 'store':
        this.mouseoverData.message = `App Store & Google Play`;
        return;
        case 'apps':
          this.mouseoverData.message = `View app features & benefits`;
          return;
          case 'releaseNotes':
            this.mouseoverData.message = `Read the latest release notes`;
            return;
            case 'email':
              this.mouseoverData.message = `Email me at me@riapacheco.com`;
              return;
              case 'home':
                this.mouseoverData.message = `Navigate back to website`;
                return;
    }
  }
  onMouseout(e: any) {
    if (e) { this.mouseoutEvent.emit(true); }
  }
}
