import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comparison-slider',
  templateUrl: './comparison-slider.component.html',
  styleUrls: ['./comparison-slider.component.scss']
})
export class ComparisonSliderComponent implements OnInit, AfterViewInit {
  @Input() sliderWidth = 500;
  @Input() imgHeight = 500;
  @Input() imgWidth = 1000;
  @Input() rightImg = '../../../assets/img/about_me/About_CBT-After.png';
  @Input() leftImg = '../../../assets/img/about_me/CBT_Before.png';
  @Input() sliderBgColor = 'white';
  @Input() sliderIconColor = 'black';
  @Input() borderColor = 'white';
  @Output() dragHandle: EventEmitter<any> = new EventEmitter<any>();

  hoverCursor = 'grab';
  grabbingCursor = 'grabbing';
  mouseIsDown = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }



}
