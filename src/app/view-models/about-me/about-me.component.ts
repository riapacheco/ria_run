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


  cbtPortfolioItems = [
    {
      title: 'Enterprise Product Portfolio Re-Launch',
      description: '',
      isDevelopment: false,
      icon: 'rocket_launch',
      folders: [
        {
          title: 'Re-Launched Portfolio including all Enterprise Elements',
          isOpen: false,
          contents: 'Blah blah blah',
          targetLabel: 'View Comparison',
          target: 'productRelaunch'
        },
        {
          title: 'Market, Technology, and Industry Segmented Research',
          isOpen: false,
          contents: '',
          targetLabel: 'View Samples',
          target: 'industryResearch'
        },
        {
          title: 'Sales Enablement Development & Materials',
          isOpen: false,
          contents: '',
          targetLabel: 'View Sample Data Sheets',
          target: 'dataSheets'
        }
      ]
    },
    {
      title: 'Asset Tracker Internal Platform Development',
      description: '',
      isDevelopment: true,
      icon: 'code',
      folders: [
        {
          title: 'Data Model Design & Testing',
          isOpen: false,
          contents: '',
          targetLabel: 'Data Model Sample',
          target: 'dataModelling'
        },
        {
          title: 'Inventory Manager - System of Record Module',
          isOpen: false,
          contents: 'lsdkfjsld',
          targetLabel: 'See Preview',
          target: 'inventoryManagerFeature'
        },
        {
          title: 'Lab Kanban - M&R Workflow Tracking Module',
          isOpen: false,
          contents: 'sldkfjsdlkfjsdlkj',
          targetLabel: 'See Preview',
          target: 'labKanbanFeature'
        }
      ]
    },
    {
      title: 'MFG Process Scoping for Software Development',
      description: '',
      isDevelopment: true,
      icon: 'web',
      folders: []
    },
    { 
      title: 'Product Marketing Discovery',
      description: '',
      isDevelopment: false,
      icon: 'file_copy',
      folders: []
    }
  ];

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
  @ViewChild('startHere') startHere!: ElementRef;
  @ViewChild('cbtScrollBlock') cbtScrollBlock!: ElementRef;
  @ViewChild('mydomaScrollBlock') mydomaScrollBlock!: ElementRef;
  @ViewChild('showpassScrollBlock') showpassScrollBlock!: ElementRef;
  @ViewChild('cbtComponent') cbtComponent!: SplitBlockComponent;
  @ViewChild('mydomaBlock') mydomaBlock!: ElementRef;
  @ViewChild('steerScrollBlock') steerScrollBlock!: ElementRef;
  @ViewChild('intrigaScrollBlock') intrigaScrollBlock!: ElementRef;

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
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Check viewport width for `isMobile` property
  private checkView() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }
  
  // scrollTo arrow buttons
  scrollTo(target: string) {
    switch (target) {
      case 'firstSection':
        setTimeout(() => {
          this.cbtScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'mydoma':
        setTimeout(() => {
          this.mydomaScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'steer':
        setTimeout(() => {
          this.steerScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'showpass':
        setTimeout(() => {
          this.showpassScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        },100);
        break;
      case 'intriga':
        setTimeout(() => {
          this.intrigaScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'cbt':
        setTimeout(() => {
          this.cbtScrollBlock.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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



  private showToast() {
    const title = 'Under Construction';
    const description = `But why not build in public?`;
    this.toast.callToast(title, description, false);
  }


  onFolderOpen(targetString: string) {
    console.log(targetString);

  }
}
