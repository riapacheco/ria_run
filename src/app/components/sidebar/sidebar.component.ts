import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sidebarOpenClose } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IMenuCard } from 'src/app/interfaces/menu-card.interface';
import { MenuCardService } from 'src/app/services/menu-card.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [ sidebarOpenClose ]
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  /* ------------------------------- CARD ITEMS ------------------------------- */
  menuCards: IMenuCard[] = [];

  isMobile!: boolean;
  private sub = new Subscription();

  constructor(
    private observer: BreakpointObserver,
    public sidebar: SidebarService,
    private menuService: MenuCardService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.checkDevice());
    this.sub.add(this.getMenuData());
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  /* -------------------------- MENU CARD POPULATION -------------------------- */
  private getMenuData() {
    this.menuService.getMenuCards().then((res: any) => {
      this.menuCards = res;
    });
  }

  onClose() {
    this.sidebar.toggleSidebar(false);
  }
}
