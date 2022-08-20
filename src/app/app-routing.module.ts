import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './view-models/about-me/about-me.component';
import { MainComponent } from './view-models/main/main.component';
import { TerminalComponent } from './view-models/terminal/terminal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'terminal',
    pathMatch: 'full'
  },
  {
    path: 'terminal',
    component: TerminalComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
