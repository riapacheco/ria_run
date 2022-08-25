import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TSectionType } from 'src/app/components/section/section.component';
import { TOP_NAV } from 'src/app/constants/size.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IAboutMe } from 'src/app/interfaces/about-me.interface';
import { ICompany } from 'src/app/models/xp.model';
import { AboutMeService } from 'src/app/services/about-me.service';
import { XpService } from 'src/app/services/xp.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {


  /* ---------------------------------- DATA ---------------------------------- */
  allCompanyData: ICompany[] = [];
  ColdBoreProd: ICompany[] = [];
  ColdBoreDev: ICompany[] = [];


  // Content properties
  heroPara!: string | undefined;

  // Navbar styling [stationary only]
  navClass = {
    desktop: 'top-nav canary',
    mobile: 'top-nav canary mobile'
  }

  // HERO
  sectionClass: TSectionType = 'section orange';
  maxHeight = '70vh';

  // SECTION 1
  sections = [
    {
      index: 0,
      divId: 'section_1',
      company: 'Cold Bore Technology'
    }
  ];
  
  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private aboutService: AboutMeService,
    private xp: XpService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkView());
    this.sub.add(this.getHeroContent());
    this.sub.add(this.getCompanyData());
  }

  ngAfterViewInit() {
    // this.scrollToFirst();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private checkView() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
  
  private scrollToFirst() {
    const location = document.getElementById(this.sections[0].divId);
    setTimeout(() => {
      location?.scrollIntoView();
    }, 100)
  }
  
  scrollTo(target: string) {
    switch (target) {
      case 'firstSection':
        
        break;
    }
  }


  /* ---------------------------------- DATA ---------------------------------- */
  getHeroContent() {
    this.aboutService.getAllContent().then((res: IAboutMe[]) => {
      const aboutMeData = [...res];
      const heroData = aboutMeData.find((obj: any) => obj.type == 'hero paragraph');
      this.heroPara = heroData?.body;
    })
  }
  getCompanyData() {
 
  }
}
