import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { leftSlidesLeft, rightSlideRight } from 'src/app/constants/animations.constants';
import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';

@Component({
  selector: 'app-split-block',
  templateUrl: './split-block.component.html',
  styleUrls: ['./split-block.component.scss'],
  animations: [ leftSlidesLeft, rightSlideRight ]
})
export class SplitBlockComponent implements OnInit, OnDestroy {

  @Input() blockTitle = 'Split Block Title';

  // Toggle switch
  btn = {
    first: {
      label: 'Both',
      isActive: true,
    },
    second: {
      label: 'Product',
      isActive: false,
    },
    third: {
      label: 'Development',
      isActive: false
    }
  }

  // Presentation properties that don't need to be controlled by parent
  left = {
    isShowing: true,
    width: '50%',
    display: 'block',
  };

  right = {
    isShowing: true,
    width: '50%',
    display: 'block'
  }

  isMobile!: boolean;
  private sub = new Subscription();
  constructor(
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
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

  private resetBothSides() {
    this.right.isShowing = true;
    this.left.isShowing = true;
    setTimeout(() => {
      this.right.width = '50vw';
      this.left.width = '50vw';
      this.right.display = 'block';
      this.left.display = 'block';
      this.resetToggles();
    }, 100);
  }

  private resetToggles() {
    this.btn = {
      first: {
        label: 'Both',
        isActive: true,
      },
      second: {
        label: 'Product',
        isActive: false,
      },
      third: {
        label: 'Development',
        isActive: false
      }
    }
  }

  private expandLeftSide() {
    this.right.isShowing = false;
    this.left.isShowing = true;
    this.left.width = '100vw';
    setTimeout(() => {
      this.left.display = 'block';
      this.right.display = 'none';
      this.setSecondToggle();
    }, 100);
  }

  private setSecondToggle() {
    this.btn = {
      first: {
        label: 'Both',
        isActive: false,
      },
      second: {
        label: 'Product',
        isActive: true,
      },
      third: {
        label: 'Development',
        isActive: false
      }
    }
  }

  private expandRightSide() {
    this.left.isShowing = false;
    this.right.isShowing = true;
    this.right.width = '100vw';
    setTimeout(() => {
      this.right.display = 'block';
      this.left.display = 'none';
      this.setThirdToggle();
    }, 100);
  }

  private setThirdToggle() {
    this.btn = {
      first: {
        label: 'Both',
        isActive: false,
      },
      second: {
        label: 'Product',
        isActive: false,
      },
      third: {
        label: 'Development',
        isActive: true
      }
    }
  }

  public onExpand(section: string) {
    switch (section) {
      case 'left': this.expandLeftSide();
      break;
      case 'right': this.expandRightSide();
      break;
      case 'both': this.resetBothSides();
      break;
    }
  }

  // Toggle Switch
  onToggleSwitch(toggle: any) {
    switch (toggle) {
      case 'firstTab':
        this.resetBothSides();
      break;
      case 'secondTab':
        this.expandLeftSide();
      break;
      case 'thirdTab':
        this.expandRightSide();
      break;
    }
  }
  

}
