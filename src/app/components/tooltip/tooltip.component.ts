import { Component } from '@angular/core';
import { TooltipService } from 'src/app/services/tooltip.service';

@Component({
  selector: 'app-tooltip',

  /* -------------------------- IN-COMPONENT TEMPLATE ------------------------- */
  template: `
  <ng-container *ngIf="(tooltip.showsTooltip$ | async)">
    <div
      [style.top.px]="(tooltip.topCoords$ | async)"
      [style.left.px]="(tooltip.leftCoords$ | async)"
      class="tooltip">
      <div class="tooltip-text">
        {{ (tooltip.text$ | async) }}
      </div>
    </div>
  </ng-container>`,

  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  constructor( public tooltip: TooltipService ) { }
}
