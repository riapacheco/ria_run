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
      imageUrl: 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/catalog/Tagline1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9jYXRhbG9nL1RhZ2xpbmUxLmpwZyIsImlhdCI6MTY2MjA1OTEwNywiZXhwIjoxOTc3NDE5MTA3fQ.4rxLVmXsCFXZBCTHKXFVLnZVBPsrTkbr-xAhLUgWz64&t=2022-09-01T19%3A05%3A07.864Z',
      title: 'Main Tagline',
      caption: 'This is the main tagline image'
    },
    {
      imageUrl: 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/catalog/OnsiteHardware.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9jYXRhbG9nL09uc2l0ZUhhcmR3YXJlLmpwZyIsImlhdCI6MTY2MjA1OTQzNCwiZXhwIjoxOTc3NDE5NDM0fQ.tqh-jC4QcOgY90mTO9yOpqqgtYRrpG-3whdFAn3AyN0&t=2022-09-01T19%3A10%3A34.153Z',
      title: 'Onsite Hardware',
      caption: '',
    },
    {
      imageUrl: 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/catalog/SmartEngineBenefits3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9jYXRhbG9nL1NtYXJ0RW5naW5lQmVuZWZpdHMzLmpwZyIsImlhdCI6MTY2MjA1OTQ2NCwiZXhwIjoxOTc3NDE5NDY0fQ.CciJuMAAMtaGgj1kGTJfURdeLQ2JGnT6mohYJak-NS0&t=2022-09-01T19%3A11%3A04.647Z',
      title: 'Smart Engine',
      caption: 'And a caption for Smart Engine goes here',
    },
    {
      imageUrl: 'https://lvvhyxbvfcygnlzlbsok.supabase.co/storage/v1/object/sign/ria-gets-buckets/portfolio/cold_bore_technology/catalog/WebBasedConsole4.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyaWEtZ2V0cy1idWNrZXRzL3BvcnRmb2xpby9jb2xkX2JvcmVfdGVjaG5vbG9neS9jYXRhbG9nL1dlYkJhc2VkQ29uc29sZTQuanBnIiwiaWF0IjoxNjYyMDU5NDgzLCJleHAiOjE5Nzc0MTk0ODN9.astlML-z8eSX9eG3r5U3F1u1qKUWR-c-WYDJz2ayofc&t=2022-09-01T19%3A11%3A23.311Z',
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
