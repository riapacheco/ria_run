import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { SbService } from 'src/app/services/sb.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  textarea = '';
  contact = {
    fullName: '',
    email: '',
    message: ''
  };

  isMobile!: boolean;

  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private supaService: SbService
  ) { }

  ngOnInit(): void {
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

  onSend() {
    this.supaService.sendMessage(
      this.contact.fullName,
      this.contact.email,
      this.contact.message
    ).then((res: any) => {
      if (res) {
        this.contact = {
          fullName: '',
          email: '',
          message: ''
        }
      }
    })

  }
}
