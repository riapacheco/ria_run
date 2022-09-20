import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMouseoverData, TRiCreatedLink } from 'src/app/components/ricreated/rc-top-nav/rc-top-nav.component';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { TooltipService } from 'src/app/services/tooltip.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, OnDestroy {

  apps = [
    {
      icon: 'auto_stories',
      label: 'RiReader',
      altLabel: 'Currently in active development',
      showsAlt: false
    },
    {
      label: 'RiOrganizer',
      icon: 'widgets',
      altLabel: 'Developing soon',
      showsAlt: false
    },
    {
      label: 'RiDefiner',
      icon: 'history_edu',
      altLabel: 'Coming later',
      showsAlt: false
    },
    {
      label: 'RiMixer',
      icon: 'supervisor_account',
      altLabel: 'Coming later',
      showsAlt: false
    }
  ];

  @ViewChild('appsDialog') appsDialog!: ElementRef;

  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    private tooltip: TooltipService,
    private observer: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub.add(this.observeBreakpoints());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /* --------------------------- BREAKPOINT OBSERVER -------------------------- */
  private observeBreakpoints() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  /* ------------------------ RC TOP NAV EMITTED EVENTS ----------------------- */
  onLogoClick(wasClicked: boolean) {
    if (wasClicked) {
      this.router.navigateByUrl('/main');
    }
  }

  onLinkClick(target: TRiCreatedLink) {
    switch(target) {
      case 'home':
        this.router.navigateByUrl('/main');
        break;
        case 'email':
          window.open('mailto:me@riapacheco.com');
          break;
          case 'store':
            window.alert('Coming soon...');
            break;
            case 'apps':
              window.alert('Coming soon...');
              break;
              case 'releaseNotes':
                window.alert('Coming soon...');
                break;
    }
  }

  onMouseover(data: IMouseoverData) {
    this.tooltip.showTooltip(
      data.message,
      data.topPosition,
      data.leftPosition
    )
  }

  onMouseout(noHover: any) {
    if (noHover) {
      this.tooltip.hideTooltip();
    }
  }

  /* ------------------------------- APP BADGES ------------------------------- */
  onBadgeClick(appName: string) {
    const app = this.apps.map((app: any) => {
      if (app.label == appName) {
        window.alert(app.altLabel);
      }
    })
  }

  private resetBadges() {
    this.apps.map(eachApp => Object.assign(eachApp, { showsAlt: false }));
  }
}
