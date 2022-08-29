import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { CodeTabService } from 'src/app/services/code-tab.service';
import { ICodeTab } from 'src/app/models/code-tabs.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit, AfterViewInit, OnDestroy {

  /* ----------------------------- INDICATOR CARD ----------------------------- */
  indicatorCardsContent: ICodeTab[] = [];
  cardsHtmlContent!: ICodeTab | undefined;
  cardsTypescriptContent!: ICodeTab | undefined;
  cardsScssContent!: ICodeTab | undefined;

  /* ------------------------------ IPHONE-MOCKUP ----------------------------- */
  iphoneMockupContent: ICodeTab[] = [];
  iphoneHtmlContent!: ICodeTab | undefined;
  iphoneTypescriptContent!: ICodeTab | undefined;
  iphoneScssContent!: ICodeTab | undefined;

  /* -------------------------- RESPONSIVE ACTION BAR ------------------------- */
  responsiveActionBarContent: ICodeTab[] = [];
  responsiveActionBarHtmlContent!: ICodeTab | undefined;
  responsiveActionBarTypescriptContent!: ICodeTab | undefined;
  responsiveActionBarScssContent!: ICodeTab | undefined;

  /* -------------------------------- ALL TABS -------------------------------- */
  hintClass = 'hidden-message';     // RESET THIS
  showsHint = false; // to prevent any animation slips


  /* ---------------------------- TOP NAV COMPONENT --------------------------- */
  navClass = {
    desktop: 'top-nav canary',
    mobile: 'top-nav canary mobile'
  };

  @ViewChild('hint') hint!: ElementRef;

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private service: CodeTabService,
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
    this.sub.add(this.getData());
    this.showsHint = true;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.clearStorage();
  }

  /* ------------------------------ DEVICE CHECK ------------------------------ */
  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  /* ---------------------------------- DATA ---------------------------------- */
  private getData() {
    this.service.getAllCodeTabs().then((res: any) => {
      const data = [...res];
      const indicatorCards = data.filter((obj: any) => obj.component == 'Indicator Card');
      this.indicatorCardsContent = indicatorCards;
      this.cardsHtmlContent = indicatorCards.find((obj: any) => obj.language == 'html');
      this.cardsTypescriptContent = indicatorCards.find((obj: any) => obj.language == 'typescript');
      this.cardsScssContent = indicatorCards.find((obj: any) => obj.language == 'scss');

      const iphoneData = data.filter((obj: any) => obj.component == 'Iphone Mockup');
      this.iphoneMockupContent = iphoneData;
      this.iphoneHtmlContent = iphoneData.find((obj: any) => obj.language == 'html');
      this.iphoneTypescriptContent = iphoneData.find((obj: any) => obj.language == 'typescript');
      this.iphoneScssContent = iphoneData.find((obj: any) => obj.language == 'scss');

      const actionBarData = data.filter((obj: any) => obj.component == 'Responsive Action Bar');
      this.responsiveActionBarContent = actionBarData;
      this.responsiveActionBarHtmlContent = actionBarData.find((obj: any) => obj.language == 'html');
      this.responsiveActionBarTypescriptContent = actionBarData.find((obj: any) => obj.language == 'typescript' );
      this.responsiveActionBarScssContent = actionBarData.find((obj: any) => obj.language == 'scss');

    })
  }

  /* --------------------------- LISTEN TO SHOW DIV --------------------------- */
  @HostListener('body:scroll', ['$event'])
  public onScrollBy() {
    const windowHeight = window.innerHeight;
    const boundingRect = this.hint.nativeElement.getBoundingClientRect();

    if (boundingRect.top >= 0 && boundingRect.bottom <= windowHeight) {
      this.checkStorage();
    }
  }

  checkStorage() {
    const key = 'New User Session';
    const date = new Date().toDateString();

    if (!localStorage.getItem(key)) {
      this.playStopHint();
      localStorage.setItem(key, date);
    }
  }

  playStopHint() {
    this.hintClass = 'hidden-message showing';
    setTimeout(() => {
      this.hintClass = 'hidden-message';
    }, 2500);
  }

  clearStorage() {
    this.showsHint = false;
    localStorage.clear();
  }
}
