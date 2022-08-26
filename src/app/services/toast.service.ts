import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const TOAST_CLASS = {
  DESKTOP: 'toast',
  DESKTOP_CLOSE: 'toast close',
  MOBILE: 'toast mobile',
  MOBILE_CLOSE: 'toast close mobile'
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _toastClass$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_CLASS.DESKTOP_CLOSE)
  public toastClass$: Observable<string> = this._toastClass$.asObservable();

  private _toastClassMobile$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_CLASS.MOBILE_CLOSE);
  public toastClassMobile$: Observable<string> = this._toastClassMobile$.asObservable();

  // Toggle
  private _showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showsToast$: Observable<boolean> = this._showsToast$.asObservable();
  // Toast message
  private _title$: BehaviorSubject<string> = new BehaviorSubject<string>('Plain text title');
  public title$: Observable<string> = this._title$.asObservable();
  // Description
  private _description$: BehaviorSubject<string> = new BehaviorSubject<string>('use template literal or something');
  public description$: Observable<string> = this._description$.asObservable();

  toastTimeout = 3500;

  constructor() {
  }

  callToast(title: string, description: string, persists?: boolean) {
    this._showsToast$.next(true);
    this._toastClass$.next(TOAST_CLASS.DESKTOP);
    this._toastClassMobile$.next(TOAST_CLASS.MOBILE);
    this._title$.next(title);
    this._description$.next(description);
    if (persists == undefined || persists == false) {
      setTimeout(() => {
        this._showsToast$.next(false);
        setTimeout(() => {
          this._toastClass$.next(TOAST_CLASS.DESKTOP_CLOSE);
          this._toastClassMobile$.next(TOAST_CLASS.MOBILE_CLOSE);
        }, 150);
      }, this.toastTimeout);
    }
  }

  public dismissToast() {
    this._showsToast$.next(false);
    setTimeout(() => {
      this._toastClass$.next(TOAST_CLASS.DESKTOP_CLOSE);
      this._toastClassMobile$.next(TOAST_CLASS.MOBILE_CLOSE);
    }, 150);
  }
}
