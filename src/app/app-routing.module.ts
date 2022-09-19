import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './view-models/about-me/about-me.component';
import { AppsComponent } from './view-models/apps/apps.component';
import { ContactComponent } from './view-models/contact/contact.component';
import { MainComponent } from './view-models/main/main.component';
import { TerminalComponent } from './view-models/terminal/terminal.component';
import { UserInterfaceComponent } from './view-models/user-interface/user-interface.component';

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
  },
  {
    path: 'user-interface',
    component: UserInterfaceComponent
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
