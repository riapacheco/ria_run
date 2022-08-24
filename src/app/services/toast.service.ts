import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Toggle
  private _showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showsToast$: Observable<boolean> = this._showsToast$.asObservable();
  // Toast message
  private _title$: BehaviorSubject<string> = new BehaviorSubject<string>('Plain text title');
  public title$: Observable<string> = this._title$.asObservable();
  // Description
  private _description$: BehaviorSubject<string> = new BehaviorSubject<string>('use template literal or something');
  public description$: Observable<string> = this._description$.asObservable();

  constructor() {
  }

  callToast(title: string, description: string, persists?: boolean) {
    this._showsToast$.next(true);
    this._title$.next(title);
    this._description$.next(description);
    if (persists == undefined) {
      setTimeout(() => {
        this._showsToast$.next(false);
      }, 5800);
    }
  }

  public dismissToast() {
    this._showsToast$.next(false);
  }
}
