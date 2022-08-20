import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollDiv') scrollDiv!: ElementRef;

  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.scrollDiv.nativeElement.scrollIntoView();
  }
  ngOnDestroy() {}

  onActivate() {
    this.scrollDiv.nativeElement.scrollIntoView();
  }
}
