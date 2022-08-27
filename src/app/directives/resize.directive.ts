import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {
  prevClientY = 0;
  isGrabbing = false;
  
  @Input() height!: number;
  @Output() heightChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('body:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.isGrabbing) {
      return;
    }
    this.height += (event.clientY - this.prevClientY);
    this.heightChange.emit(this.height);
    this.prevClientY = event.clientY;
  }

  @HostListener('body:touchmove', ['$event'])
  public onTouchMove(event: TouchEvent) {
    if (!this.isGrabbing) {
      return;
    }
    this.height += (event.touches[0].clientY - this.prevClientY);
    this.heightChange.emit(this.height);
    this.prevClientY = event.touches[0].clientY;
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.isGrabbing = false;
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    this.isGrabbing = false;
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    this.isGrabbing = true;
    this.prevClientY = event.clientY;
  }

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    this.isGrabbing = true;
    this.prevClientY = event.touches[0].clientY;
  }
}
