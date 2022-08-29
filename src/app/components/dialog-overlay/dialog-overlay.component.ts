
import { AfterViewInit, Component, Input} from '@angular/core';

import { DialogOverlayService } from 'src/app/services/dialog-overlay.service';

@Component({
  selector: 'app-dialog-overlay',
  templateUrl: './dialog-overlay.component.html',
  styleUrls: ['./dialog-overlay.component.scss'],
  
})
export class DialogOverlayComponent implements AfterViewInit {
  @Input() isMobile!: boolean;

  constructor(
    public dialog: DialogOverlayService,
  ) { }

  ngAfterViewInit() {}


  onClose() { this.dialog.onClose(); }
}
