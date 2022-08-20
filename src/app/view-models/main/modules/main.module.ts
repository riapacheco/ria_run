import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from '../main.component';
import { HomeContentService } from 'src/app/services/home-content.service';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
  exports: [
    MainRoutingModule
  ],
  providers: [
    HomeContentService
  ]
})
export class MainModule { }
