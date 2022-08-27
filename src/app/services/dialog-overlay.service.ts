import { Injectable } from '@angular/core';
import { BehaviorSubject, max, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogOverlayService {

  private _isShowing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isShowing$: Observable<boolean> = this._isShowing$.asObservable();

  private _title$: BehaviorSubject<string> = new BehaviorSubject<string>('Title of Dialog');
  public title$: Observable<string> = this._title$.asObservable();

  private _body$: BehaviorSubject<string> = new BehaviorSubject<string>(`Use template literals for the innerHTML element that holds this component's body content!`);
  public body$: Observable<string> = this._body$.asObservable();

  private _width$: BehaviorSubject<number> = new BehaviorSubject<number>(70);
  public width$: Observable<number> = this._width$.asObservable();

  private _height$: BehaviorSubject<number> = new BehaviorSubject<number>(60);
  public height$: Observable<number> = this._height$.asObservable();

  private _maxHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public maxHeight$: Observable<number> = this._maxHeight$.asObservable();


  constructor() { }


  configMaxHeight(height: number) { this._maxHeight$.next(height); }
  onClose() { this._isShowing$.next(false); }
  callNewDialog(dialogTitle: string, width?: number, height?: number) {
    
    this._title$.next(dialogTitle);

    if (width !== undefined) {
      this._width$.next(width);
    }

    if (height !== undefined) {
      this._height$.next(height);
    }

    this._isShowing$.next(true);
  }
}
