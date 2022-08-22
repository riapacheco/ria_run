import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';

export interface IIFrame {
  id?: string;
  url?: string;
  showsDetails?: boolean;
  altUrl?: string;
  label?: string;
  altLabel?: string;
  description?: string;
  interface?: string;
}

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit, OnDestroy {
  @Input() embedList: IIFrame[] = [
    {
      url: 'https://stackblitz.com/edit/ui-indicator-cards-ria?embed=1&file=src/app/components/data-indicator-card/data-indicator-card.component.ts',
      altUrl: 'https://angular-ivy-qtvvlg.stackblitz.io/',
      showsDetails: true,
      label: 'Another UI Thing',
      altLabel: '',
      description: 'This is another one yeyeyeyeyeye',
      interface: ``
    }
  ];
  @Input() wrapper = {
    width: '100%',
    height: '600px'
  };
  @Input() showsAltUrl = false;
  @Input() iframeClass = {
    default: 'iframe-item reverse',
    mobile: 'iframe-item mobile'
  };

  response!: HighlightAutoResult;


  isMobile?: boolean;

  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}'
    };
  }

  onAltUrl() {
    this.showsAltUrl = true;
  }
  onOriginalUrl() {
    this.showsAltUrl = false;
  }
}
