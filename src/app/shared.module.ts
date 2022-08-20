import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { JoinArrayPipe } from './pipes/join-array.pipe';
import { HttpClientModule } from '@angular/common/http';
import { CommandPromptService } from './services/command-prompt.service';
import { SectionComponent } from './components/section/section.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuCardService } from './services/menu-card.service';

@NgModule({
  declarations: [
    OutsideClickDirective,
    FilterPipe,
    FilterAllPipe,
    JoinArrayPipe,
    SectionComponent,
    TopNavComponent,
    SidebarComponent,
    MenuCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    LayoutModule,
    OutsideClickDirective,
    FilterPipe,
    FilterAllPipe,
    JoinArrayPipe,
    SectionComponent,
    TopNavComponent,
    SidebarComponent,
  ],
  providers: [
    CommandPromptService,
    MenuCardService
  ]
})
export class SharedModule { }
