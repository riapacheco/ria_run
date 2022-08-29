import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { IUseCase } from 'src/app/models/positions.model';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements AfterViewInit, OnDestroy {
  @Input() categories!: IUseCase[];
  @Output() targetButtonClick: EventEmitter<any> = new EventEmitter<any>();

  isMobile!: boolean;
  private sub = new Subscription();

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.sub.add(this.checkDevice());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.isMobile = true; }
      else { this.isMobile = false; }
    })
  }

  onTargetClick(projectTarget: any, projectContents: any) {
    this.targetButtonClick.emit({projectTarget, projectContents})
  }
}
