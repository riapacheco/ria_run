import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss']
})
export class CodePreviewComponent implements OnInit {
  @Input() componentType = '';
  cards = [
    {
      icon: 'account_balance',
      mainLabel: 'Checking',
      amount: '21,692',
      bottomLabel: 'Last 30 Days',
    },
    {
      icon: 'savings',
      mainLabel: 'Savings',
      amount: '42,304',
      bottomLabel: 'Last 30 Days',
    },
    {
      icon: 'payments',
      mainLabel: 'Bills',
      amount: '1,345',
      bottomLabel: 'Last 30 Days',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
