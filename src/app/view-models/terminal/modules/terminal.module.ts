import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalRoutingModule } from './terminal-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { TerminalComponent } from '../terminal.component';
import { CommandLineComponent } from 'src/app/components/command-line/command-line.component';
import { TerminalWindowComponent } from 'src/app/components/terminal-window/terminal-window.component';
import { CommandPromptService } from 'src/app/services/command-prompt.service';


@NgModule({
  declarations: [
    TerminalComponent,
    CommandLineComponent,
    TerminalWindowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TerminalRoutingModule
  ],
  exports: [
    TerminalRoutingModule
  ],
  providers: [
    CommandPromptService
  ]
})
export class TerminalModule { }
