import { Component, OnInit } from '@angular/core';
import { TSectionType } from 'src/app/components/section/section.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {


  // Navbar styling [stationary only]
  navClass = {
    desktop: 'top-nav black',
    mobile: 'top-nav black  mobile'
  }

  sectionClass: TSectionType = 'section orange';
  maxHeight = '70vh';
  constructor() { }

  ngOnInit(): void {
  }

}
