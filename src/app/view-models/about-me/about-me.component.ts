import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TSectionType } from 'src/app/components/section/section.component';
import { SplitBlockComponent } from 'src/app/components/split-block/split-block.component';
import { leftSlidesLeft, rightSlideRight } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IAboutMe } from 'src/app/interfaces/about-me.interface';
import { IUseCase } from 'src/app/models/positions.model';
import { AboutMeService } from 'src/app/services/about-me.service';
import { DialogOverlayService } from 'src/app/services/dialog-overlay.service';
import { SbService } from 'src/app/services/sb.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [ leftSlidesLeft, rightSlideRight ]
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                    DATA                                    */
  /* -------------------------------------------------------------------------- */
  cbtUseCases!: IUseCase[];
  cbtProductUseCases!: IUseCase[];
  cbtDevelopmentUseCases!: IUseCase[];
  cbtSliderBgColor = '#FFC400';
  cbtSliderIconColor = 'black';
  cbtBorderColor="#FFC400";

  
  /* -------------------- TOGGLE SWITCH & SPLIT BLOCK STATE ------------------- */
  showsFirst = true;
  cbtToggle = {
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
  cbtSplitBlock = {
    left: {
      isShowing: false,
      width: '0%',
      display: 'block',
    },
    right: {
      isShowing: true,
      width: '100%',
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
    private toast: ToastService,
    public dialog: DialogOverlayService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkView());
    this.sub.add(this.getHeroContent());
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.cbtScrollBlock.nativeElement.scrollIntoView();
    // }, 100);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Check viewport width for `isMobile` property
  private checkView() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) {
        this.isMobile = true;
        this.showsFirst = false;
      }
      else {
        this.isMobile = false; 
        this.showsFirst = true;
      }
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

  onToggleSwitch(e: any, company: string) {
    console.log(e)
    switch (true) {
      case e == 'firstTab' && company == 'cbt':
        this.cbtToggle.first.isActive = true;
        this.cbtToggle.second.isActive = false;
        this.cbtToggle.third.isActive = false;
        this.cbtSplitBlock = {
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
        break;
        case e == 'secondTab' && company == 'cbt':
          this.cbtToggle.first.isActive = false;
          this.cbtToggle.second.isActive = true;
          this.cbtToggle.third.isActive = false;
          this.cbtSplitBlock = {
            left: {
              isShowing: true,
              width: '100%',
              display: 'block',
            },
            right: {
              isShowing: false,
              width: '0%',
              display: 'block',
            }
          }
          break;
          case e == 'thirdTab' && company == 'cbt':
            this.cbtToggle.first.isActive = false;
            this.cbtToggle.second.isActive = false;
            this.cbtToggle.third.isActive = true;
            this.cbtSplitBlock = {
              left: {
                isShowing: false,
                width: '0%',
                display: 'block',
              },
              right: {
                isShowing: true,
                width: '100%',
                display: 'block',
              }
            }
            break;
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                              DATABASE METHODS                              */
  /* -------------------------------------------------------------------------- */
  getHeroContent() {
    this.aboutService.getAllContent().then((res: IAboutMe[]) => {
      const aboutMeData = [...res];
      const heroData = aboutMeData.find((obj: any) => obj.type == 'hero paragraph');
      this.heroPara = heroData?.body;
    })
  }
  getUseCases(data: IUseCase[]) {
    if (data) {
      this.cbtUseCases = data.filter((useCase: IUseCase) => useCase.parentCompany == 'Cold Bore Technology');
      this.cbtProductUseCases = this.cbtUseCases.filter((useCase: IUseCase) => useCase.isDevelopment == false);
      this.cbtDevelopmentUseCases = this.cbtUseCases.filter((useCase: IUseCase) => useCase.isDevelopment == true);
    }
  }


  private showToast() {
    const title = 'Under Construction';
    const description = `But why not build in public?`;
    this.toast.callToast(title, description, false);
  }


  onFolderOpen(targetString: string) {
    console.log(targetString);

  }



  /* -------------------------------------------------------------------------- */
  /*                                TARGET CLICK                                */
  /* -------------------------------------------------------------------------- */
  onProjectTargetClick(data: any) {
    const { projectTarget, projectContents } = data;
    this.dialog.callNewDialog(
      projectTarget,
      projectContents,
      65
    );
  }

}
