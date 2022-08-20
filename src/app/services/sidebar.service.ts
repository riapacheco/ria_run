import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public showsSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showsSidebar$: Observable<any> = this.showsSidebar.asObservable();
  constructor() { }

  toggleSidebar(setting: boolean) {
    this.showsSidebar.next(setting);
  }
  openSidebar() { this.showsSidebar.next(true); }
  closeSidebar() { this.showsSidebar.next(false); }
}
