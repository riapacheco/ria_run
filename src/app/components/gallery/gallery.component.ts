import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sliderLR } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

export interface IGallery {
  imageUrl: string;
  title?: string;
  caption?: string;
  index?: number;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() galleryImages: IGallery[] = [
    {
      imageUrl: '',
      title: 'Main Tagline',
      caption: 'This is the main tagline image'
    },
    {
      imageUrl: '',
      title: 'Onsite Hardware',
      caption: '',
    },
    {
      imageUrl: '',
      title: 'Smart Engine',
      caption: 'And a caption for Smart Engine goes here',
    },
    {
      imageUrl: '',
      title: 'Web-Based Console',
      caption: 'Another things',
    }
  ];
  @Input() imageConfig = {
    width: 100,
    height: 100
  };
  
  showsCaption = false;
  indexLength!: number;
  currentIndex = 0;

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.indexLength = (this.galleryImages.length - 1);
    this.sub.add(this.checkDevice());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state:BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
    console.log(this.isMobile);
  }

  onPreviousImage() {
    this.currentIndex = this.currentIndex - 1;
  }

  onNextImage() {
    if (this.currentIndex >= this.indexLength) { this.currentIndex = 0; }
    else { this.currentIndex = this.currentIndex + 1; }
  }
}
