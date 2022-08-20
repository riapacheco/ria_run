import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TSectionType } from 'src/app/components/section/section.component';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IHomeContent } from 'src/app/interfaces/home-content.interface';
import { HomeContentService } from 'src/app/services/home-content.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  isMobile!: boolean;
  sectionOne: IHomeContent = {};
  sectionTwo: IHomeContent = {};
  sectionThree: IHomeContent = {};

  sectionThreeClass: TSectionType = 'section painted';

  @ViewChild('sectionTwoDiv') sectionTwoDiv!: ElementRef;
  @ViewChild('sectionThreeDiv') sectionThreeDiv!: ElementRef;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver,
    private homeService: HomeContentService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkBreakpoints());
    this.getDatabaseContent();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {}

  // Check Breakpoints
  private checkBreakpoints() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }


  scrollTo(sectionName: string) {
    switch (sectionName) {
      case 'sectionTwo':
        setTimeout(() => {
          this.sectionTwoDiv.nativeElement.scrollIntoView({ behavior: 'smooth' })
        }, 120);
        break;
      case 'sectionThree':
        setTimeout(() => {
          this.sectionThreeDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        break;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    DATA                                    */
  /* -------------------------------------------------------------------------- */
  getDatabaseContent() {
    this.homeService.getContentByRefName('sectionOne').then((res: any) => {
      if (res) {this.sectionOne = res; }
    }).catch((error) => { console.log(error); });

    this.homeService.getContentByRefName('sectionTwo').then((res: any) => {
      if (res) { this.sectionTwo = res; }
    }).catch((error) => { console.log(error); })

    this.homeService.getContentByRefName('sectionThree').then((res: any) => {
      if (res) { this.sectionThree = res; }
    }).catch((error) => { console.log(error); })
  }
}
