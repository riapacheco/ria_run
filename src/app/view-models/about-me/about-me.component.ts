import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TSectionType } from 'src/app/components/section/section.component';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IAboutMe } from 'src/app/interfaces/about-me.interface';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {

  showContent = false;

  // Content properties
  heroPara!: string | undefined;

  // Navbar styling [stationary only]
  navClass = {
    desktop: 'top-nav canary',
    mobile: 'top-nav canary mobile'
  }

  sectionClass: TSectionType = 'section orange';
  maxHeight = '70vh';

  @ViewChild('firstSection') firstSection!: ElementRef;
  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver,
    private aboutService: AboutMeService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkView());
    this.sub.add(this.getData());
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
          this.firstSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        break;
    }
  }


  /* ---------------------------------- DATA ---------------------------------- */
  getData() {
    this.aboutService.getAllContent().then((res: IAboutMe[]) => {
      const aboutMeData = [...res];
      
      const heroData = aboutMeData.find((obj: any) => obj.type == 'hero paragraph');
      this.heroPara = heroData?.body;
    })
  }
}
