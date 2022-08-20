import { Component } from '@angular/core';


@Component({
  selector: 'app-terminal-window',
  template: `
    <div class="terminal-window">
      <ng-content select="[terminalReturnContent]"></ng-content>
      <div class="shadow-div"></div>
    </div>
  `,
  styleUrls: ['./terminal-window.component.scss']
})
export class TerminalWindowComponent {}
