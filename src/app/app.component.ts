import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollDiv') scrollDiv!: ElementRef;

  constructor() {}
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    document.body.scroll(0,0);
  }
  ngOnDestroy() {}

  onActivate() { document.body.scroll(0,0); }
}
