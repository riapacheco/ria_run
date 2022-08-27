import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TSectionType } from 'src/app/components/section/section.component';
import { SplitBlockComponent } from 'src/app/components/split-block/split-block.component';
import { leftSlidesLeft, rightSlideRight } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { COMPANY, TABLE_NAME } from 'src/app/enums/company.enums';
import { IAboutMe } from 'src/app/interfaces/about-me.interface';
import { ICompany, IDevProjects, IProductMgmt } from 'src/app/models/xp.model';
import { AboutMeService } from 'src/app/services/about-me.service';
import { SbService } from 'src/app/services/sb.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [ leftSlidesLeft, rightSlideRight ]
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {


  /* ------------------------------ COMPANY DATA ------------------------------ */
  cbt!: ICompany;
  cbtPP!: IProductMgmt[] | any;
  cbtDV!: IDevProjects[] | any;
  mydoma!: ICompany;
  mydomaPP!: IProductMgmt[] | any;
  mydomaDV!: IDevProjects[] | any;
  steer!: ICompany;
  steerPP!: IProductMgmt[] | any;
  steerDV!: IDevProjects[] | any;

  /* ---------------------------- SPLIT BLOCK STATE --------------------------- */
  cbtSplitBlock = {
    left: {
      isShowing: true,
      width: '50%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '50%',
      display: 'block',
    }
  }
  mydomaSplitBlock = {
    left: {
      isShowing: true,
      width: '50%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '50%',
      display: 'block',
    }
  };
  steerSplitBlock = {
    left: {
      isShowing: true,
      width: '50%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '50%',
      display: 'block',
    }
  };
  showpassSplitBlock = {
    left: {
      isShowing: true,
      width: '50%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '50%',
      display: 'block',
    }
  };
  intrigaSplitBlock = {
    left: {
      isShowing: true,
      width: '50%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '50%',
      display: 'block',
    }
  };

  @ViewChild('startHere') startHere!: ElementRef;


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

  /* --------------------------- SECTION ANIMATIONS --------------------------- */
  @ViewChild('cbtComponent') cbtComponent!: SplitBlockComponent;
  @ViewChild('mydomaBlock') mydomaBlock!: ElementRef;

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private aboutService: AboutMeService,
    private supaService: SbService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkView());
    this.sub.add(this.getHeroContent());
    this.sub.add(this.getData());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showToast();
    }, 1000);
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
  
  
  scrollTo(target: string) {
    switch (target) {
      case 'firstSection':
        setTimeout(() => {
          this.startHere.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
    }
  }

  getToggleState(state: any, childName: string) {
    console.log(state, childName);
  }


  /* ---------------------------------- DATA ---------------------------------- */
  getHeroContent() {
    this.aboutService.getAllContent().then((res: IAboutMe[]) => {
      const aboutMeData = [...res];
      const heroData = aboutMeData.find((obj: any) => obj.type == 'hero paragraph');
      this.heroPara = heroData?.body;
    })
  }

  getData() {
    this.supaService.get('companies').subscribe((res: any) => {
      const companyData = [...res];

      this.cbt = companyData.find((company: ICompany) => company.name == COMPANY.CBT);
      this.supaService.getFromArray(TABLE_NAME.PRODUCT, 'id', this.cbt.productMgmtIds).subscribe((res: any) => { this.cbtPP = res; });
      this.supaService.getFromArray(TABLE_NAME.DEV, 'id', this.cbt.devProjectIds).subscribe((res: any) => { this.cbtDV = res; });

      this.mydoma = companyData.find((company: ICompany) => company.name == COMPANY.MYDOMA);
      // this.supaService.getFromArray(TABLE_NAME.PRODUCT, 'id', this.mydoma.productMgmtIds).subscribe((res: any) => { this.mydomaPP = res; });
      // this.supaService.getFromArray(TABLE_NAME.DEV, 'id', this.mydoma.devProjectIds).subscribe((res: any) => { this.mydomaDV = res; });
    })
  }


  private showToast() {
    const title = 'Under Construction';
    const description = `But why not build in public?`;
    this.toast.callToast(title, description, false);
  }
}
