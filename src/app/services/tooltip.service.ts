import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  private _showsTooltip$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showsTooltip$: Observable<boolean> = this._showsTooltip$.asObservable();

  private _topCoords$: BehaviorSubject<number> = new BehaviorSubject<number>(215);
  public topCoords$: Observable<number> = this._topCoords$.asObservable();

  private _leftCoords$: BehaviorSubject<number> = new BehaviorSubject<number>(400);
  public leftCoords$: Observable<number> = this._leftCoords$.asObservable();

  private _text$: BehaviorSubject<string> = new BehaviorSubject<string>('Default Text on Tooltip');
  public text$: Observable<string> = this._text$.asObservable();



  constructor() { }

  public showTooltip(text: string, top: number, left: number) {
    this._text$.next(text);
    this._topCoords$.next(top);
    this._leftCoords$.next(left);
    setTimeout(() => {
      this._showsTooltip$.next(true);
    }, 50);
  }

  public hideTooltip() {
    setTimeout(() => {
      this._showsTooltip$.next(false);
    }, 100);
    // this.clearTooltip();
  }
  
  private clearTooltip() {
    this._topCoords$.next(215);
    this._leftCoords$.next(400);
    this._text$.next('Default Text on Tooltip');
  }
}
