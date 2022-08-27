import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appResizeLR]'
})
export class ResizeLrDirective {
  prevClientX = 0;
  isGrabbing = false;
  
  @Input() width!: number;
  @Output() widthChange: EventEmitter<any> 
                        = new EventEmitter<any>();

  /* ------------------------------- MOUSE EVENT ------------------------------ */
  @HostListener('body:mousemove', ['$event'])
  public mouseMove(event: MouseEvent) {
    if (!this.isGrabbing) { return; }
    this.width += (event.clientX - this.prevClientX);
    this.widthChange.emit(this.width);
    this.prevClientX = event.clientX;
  }
  @HostListener('mouseup', ['$event'])
  public mouseUp(event: MouseEvent) { if (event) { this.isGrabbing = false; } }
  @HostListener('mousedown', ['$event']) 
  public mousedown(event: MouseEvent) {
    this.isGrabbing = true;
    this.prevClientX = event.clientX;
  }

  /* ------------------------------- TOUCH EVENT ------------------------------ */
  @HostListener('body:touchmove', ['$event'])
  public touchMove(event: TouchEvent) {
    if (!this.isGrabbing) { return;}
    this.width += (event.touches[0].clientX - this.prevClientX);
    this.widthChange.emit(this.width);
    this.prevClientX = event.touches[0].clientX;
  }
  @HostListener('touchend', ['$event'])
  public touchEnd(event: TouchEvent) { if (event) { this.isGrabbing = false; } }
  @HostListener('touchstart', ['$event'])
  public touchStart(event: TouchEvent) {
    this.isGrabbing = true;
    this.prevClientX = event.touches[0].clientX;
  }
}
