
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarService } from './services/sidebar.service';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { JoinArrayPipe } from './pipes/join-array.pipe';
import { SectionComponent } from './components/section/section.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';

import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { CommandPromptService } from './services/command-prompt.service';
import { MenuCardService } from './services/menu-card.service';
import { MainComponent } from './view-models/main/main.component';
import { HomeContentService } from './services/home-content.service';
import { TerminalComponent } from './view-models/terminal/terminal.component';
import { CommandLineComponent } from './components/command-line/command-line.component';
import { TerminalWindowComponent } from './components/terminal-window/terminal-window.component';

import { AboutMeComponent } from './view-models/about-me/about-me.component';

@NgModule({
  declarations: [
    TopNavComponent,
    TerminalComponent,
    CommandLineComponent,
    TerminalWindowComponent,
    AppComponent,
    OutsideClickDirective,
    FilterPipe,
    FilterAllPipe,
    JoinArrayPipe,
    SectionComponent,
    SidebarComponent,
    MenuCardComponent,
    MainComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule
  ],

  providers: [
    { 
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    SidebarService,
    CommandPromptService,
    MenuCardService,
    HomeContentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
