import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { ICodeTab } from 'src/app/models/code-tabs.model';
import { CodeTabService } from 'src/app/services/code-tab.service';


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
  

  /* ---------------------------- TOP NAV COMPONENT --------------------------- */
  navClass = {
    desktop: 'top-nav canary',
    mobile: 'top-nav canary mobile'
  };

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private service: CodeTabService,

  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
    this.sub.add(this.getData());
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

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

      const iphoneData = data.filter((obj:any) => obj.component == 'Iphone Mockup');
      this.iphoneMockupContent = iphoneData;
      this.iphoneHtmlContent = iphoneData.find((obj: any) => obj.language == 'html');
      this.iphoneTypescriptContent = iphoneData.find((obj: any) => obj.language == 'typescript');
      this.iphoneScssContent = iphoneData.find((obj: any) => obj.language == 'scss');
    })
  }
}
