import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenuCard } from 'src/app/interfaces/menu-card.interface';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() menuItems: IMenuCard[] = [];
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

  onCardClick(e: any) {
    if (e) { this.cardClick.emit(e); }
  }
}
