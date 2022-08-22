import { AfterViewInit, Component, Input } from '@angular/core';

export type TSectionType = 'section' | 'section blue' | 'section painted' | 'section blue-paint' | 'section polygon' | 'section yellow-splatter' | 'section blue-rust' | 'section orange' | 'section pink-paint' | 'section green-paint';

@Component({
  selector: 'app-section',
  template: `
      <div
        [style.max-height]="maxHeight"
        [style.min-height]="minHeight"
        [class]="sectionClass"
        >
        <div class="section-content">
          <ng-content select="[sectionContent]"></ng-content>
        </div>
      </div>
      
  `,
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements AfterViewInit {
  @Input() minHeight = '100vh';
  @Input() maxHeight = 'none';
  @Input() showsPolygon = true;
  @Input() sectionClass: TSectionType = 'section';

  constructor() { }

  ngAfterViewInit() {}
}
