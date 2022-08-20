import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-command-line',
  templateUrl: './command-line.component.html',
  styleUrls: ['./command-line.component.scss']
})
export class CommandLineComponent implements AfterViewInit {

  /* ------------------------------ COMMAND INPUT ----------------------------- */
  // bound to input
  @Input() inputString = '';
  @Input() showsSpinner = false;
  @Output() keyupEnter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('commandLineInput') commandLineInput!: ElementRef;

  /* --------------------------------- BANNER --------------------------------- */
  currentBanner!: string;
  bannerIndex = [
    { name: 'ansiShadow', index: 0 },
    { name: 'bloody', index: 1 },
    { name: 'dosRebel', index: 2 },
    { name: 'elite', index: 3 },
    { name: 'theEdge', index: 4 },
    { name: 'bigMoney', index: 5 },
    { name: 'big', index: 6 },
    { name: '3dAscii', index: 7 },
    { name: 'deltaCorpse', index: 8 }
  ];

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.focusInput();
    this.showRandomBanner();
  }

  public showRandomBanner() {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.bannerIndex.length);
      const bannerObject = this.bannerIndex.find(banner => banner.index == randomIndex);
      if (bannerObject !== undefined) { this.currentBanner = bannerObject?.name; } 
      else { this.currentBanner = 'bigMoney'; }
    }, 200);
  }
  
  public focusInput() {
    this.commandLineInput.nativeElement.focus();
  }

  public clearInput() { this.inputString = ''; }
  /* --------------------------- CONTROL INTERACTION -------------------------- */
  onEnter(e: any) { if (e) {
    this.keyupEnter.emit(this.inputString); }
    this.showRandomBanner();
  }
  onEscape(e: any) {
    if (e) { this.router.navigateByUrl('/main'); }
  }
}
