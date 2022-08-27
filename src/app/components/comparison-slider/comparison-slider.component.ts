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
  @Input() rightImg = 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/CBT_Home-AFTER.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9DQlRfSG9tZS1BRlRFUi5wbmciLCJpYXQiOjE2NjE1NTMyOTgsImV4cCI6MTk3NjkxMzI5OH0.H4QJT50x9qlbNi1ivaWgwmZkMG7x5IHqdqwap7LfyTA&t=2022-08-26T22%3A34%3A58.206Z';
  @Input() leftImg = 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/CBT_Home_BEFORE.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9DQlRfSG9tZV9CRUZPUkUucG5nIiwiaWF0IjoxNjYxNTUzNDE3LCJleHAiOjE5NzY5MTM0MTd9.Hf2jb-_cSz_1t3hzIYFBnVMncfEFY5d1f0xYes04nxU&t=2022-08-26T22%3A36%3A57.466Z';
  @Input() sliderBgColor = 'white';
  @Input() sliderIconColor = 'black';
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
