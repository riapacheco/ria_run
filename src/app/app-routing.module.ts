import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'terminal',
    loadChildren: () => import ('./view-models/terminal/modules/terminal.module').then(m => m.TerminalModule)
  },
  {
    path: 'main',
    loadChildren: () => import ('./view-models/main/modules/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    redirectTo: 'terminal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
