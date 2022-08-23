import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { HighlightAutoResult } from 'ngx-highlightjs';
import { ICodeTab } from 'src/app/models/code-tabs.model';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() htmlData!: ICodeTab | any;
  @Input() typescriptData!: ICodeTab | any;
  @Input() scssData!: ICodeTab | any;
  @Input() tabs: ICodeTab[] = [];
  @Input() hintClass = 'hidden-message';
  @Input() showsHint!: boolean; // to prevent animation slips

  @ViewChild('hintBlock') hintBlock!: ElementRef;

  tabsState = {
    preview: true,
    html: false,
    typescript: false,
    scss: false,
  };

  
  response!: HighlightAutoResult;
  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
  }

  ngAfterViewInit() {
  }

  checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  // Code highlighting
  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}'
    };
  }

  private selectHtml() {
    this.tabsState = {
      html: true,
      typescript: false,
      scss: false,
      preview: false
    }
  }
  private selectTypescript() {
    this.tabsState = {
      html: false,
      typescript: true,
      scss: false,
      preview: false
    }
  }
  private selectSCSS() {
    this.tabsState = {
      html: false,
      typescript: false,
      scss: true,
      preview: false
    }
  }
  private selectPreview() {
    this.tabsState = {
      html: false,
      typescript: false,
      scss: false,
      preview: true
    }
  }

  onTabClick(data: any) {
    switch (data) {
      case 'html':
        this.selectHtml();
        break;
      case 'typescript':
        this.selectTypescript();
        break;
      case 'scss':
        this.selectSCSS();
        break;
      case 'preview':
        this.selectPreview();
        break;
    }
  }

  onLinkClick(link: any) {
    window.open(link);
  }

}
