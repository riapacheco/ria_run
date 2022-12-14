import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription, take } from 'rxjs';

import { BREAKPOINT_VALUE } from 'src/app/enums/breakpoint.enums';
import { CommandLineComponent } from 'src/app/components/command-line/command-line.component';
import { CommandPromptService } from 'src/app/services/command-prompt.service';
import { ICommandPrompt } from 'src/app/interfaces/command-prompt.interface';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

interface IResult {
  type?: string;
  errorMessage?: string;
  isShowing?: boolean;
  commandContent?: object;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit, OnDestroy {

  result: IResult = {
    type: '',
    errorMessage: '',
    commandContent: {},
    isShowing: false
  };
  showsSpinner = false;       // child command-line.component
  shortLoadingLength = 450;
  longLoadingLength = 1100;

  allPrompts!: ICommandPrompt[];

  @ViewChild('commandComponent') commandComponent!: CommandLineComponent; // access child methods

  private sub = new Subscription();
  constructor(
    private commandsService: CommandPromptService,
    private router: Router,
    private observer: BreakpointObserver,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.sub.add(this.checkDevice());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Helpers
  private startSpinner() { this.showsSpinner = true; }
  private stopSpinner() { this.showsSpinner = false; }
  private clearInputField() { this.commandComponent.clearInput(); }

  // Reset terminal
  private resetTerminal() {
    this.result = {
      type: '',
      errorMessage: '',
      commandContent: {},
      isShowing: false
    };
    this.clearInputField();
  }

  /* ------------------------------ CHECK DEVICE ------------------------------ */
  private checkDevice() {
    this.observer.observe([BREAKPOINT_VALUE.mobile]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[BREAKPOINT_VALUE.mobile]) { this.router.navigateByUrl('/main'); }
    })
  }



  /* ------------------------------- RUN COMMAND ------------------------------ */
  onEnter(searchText: string) {
    // Animation
    this.startSpinner();

    // Clear old results in terminal
    if (this.result.isShowing) { this.resetTerminal(); }

    // Service: Finds array of strings (commands) assoc. and returns object it belongs to
    // IF the object's identifier refName starts with `https://`, navigate there
    // ELSE trigger associated results terminal window
    // IF error || does not exist, return window + echo error string used
    this.commandsService.runCommand(searchText).then((res: any) => {
      if (res.refName.substring(0, 8) == 'https://') {
        setTimeout(() => {
          window.open(res.refName);
          this.clearInputField();
          this.stopSpinner();
        }, this.shortLoadingLength);
      }
      else {
        this.returnWindow(res.refName, undefined, res);
      }
    }).catch((error) => { this.returnWindow('error', error, undefined ); });
  }



  private returnWindow(typeName: string, contentString?: string, contentObject?: ICommandPrompt) {
    if (this.result) { this.resetTerminal(); }

    if (typeName == 'website' && contentObject !== undefined) {
      const url = contentObject.URL;
      setTimeout(() => {
        window.open(url);
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    if (typeName == 'appStore') {
      setTimeout(() => {
        this.router.navigateByUrl('/apps');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    if (typeName == 'codeBlog') {
      setTimeout(() => {
        window.open('https://riapacheco.codes');
        this.stopSpinner();
      }, this.shortLoadingLength);
    };

    if (typeName == 'userInterface') {
      setTimeout(() => {
        this.router.navigateByUrl('/user-interface');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    if (typeName == 'cv') {
      setTimeout(() => {
        this.router.navigateByUrl('/about-me');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* ---------------------------------- EMAIL --------------------------------- */
    if (typeName == 'email') {
      setTimeout(() => {
        window.open('mailto: me@riapacheco.com');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* --------------------------------- TWITTER -------------------------------- */
    if (typeName == 'twitter') {
      setTimeout(() => {
        window.open('https://twitter.com/realriapacheco');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* ------------------------------ EXIT TERMINAL ----------------------------- */
    if (typeName == 'mainWebsite') {
      setTimeout(() => {
        this.router.navigateByUrl('/main');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* ----------------------------- Github Account ----------------------------- */
    if (typeName == 'github') {
      setTimeout(() => {
        window.open('https://github.com/riapacheco');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* ------------------------------ Yutes Package ----------------------------- */
    if (typeName == 'publishedYutes') {
      setTimeout(() => {
        window.open('https://www.npmjs.com/package/@riapacheco/yutes');
        this.stopSpinner();
      }, this.shortLoadingLength)
    }

    /* ------------------------------ Snips Package ----------------------------- */
    if (typeName == 'publishedSnips') {
      setTimeout(() => {
        window.open('https://www.npmjs.com/package/@riapacheco/snips');
        this.stopSpinner();
      }, this.shortLoadingLength);
    }

    /* ----------------------------- OPTIONS SCREEN ----------------------------- */
    if (typeName == 'options') {
      setTimeout(() => {
        this.sub.add(
          this.commandsService.getAllPrompts().subscribe((res: any) => {
            this.allPrompts = res;
          })
        );

        this.result = {
          type: 'options',
          isShowing: true
        }
        this.stopSpinner();
      }, this.longLoadingLength);
    }

    /* ---------------------------- ON ERROR MESSAGE ---------------------------- */
    if (typeName == 'error') {
      setTimeout(() => {
        this.result = {
          type: typeName,
          errorMessage: contentString,
          isShowing: true
        }
        this.stopSpinner();
      }, this.shortLoadingLength)
    }

    /* -------------------------------- CLEAR ALL ------------------------------- */
    if (typeName == 'clearAll') {
      this.resetTerminal();
      this.stopSpinner();
    }
  }

  confirmCopy() {
    const title = 'Copied to Clipboard!';
    const description = `Press <code>CTRL+V</code> to paste the command and <code>ENTER</code> to run it`;
    this.toast.callToast(title, description, undefined);
  }

}
