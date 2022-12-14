import {
  HighlightModule,
  HIGHLIGHT_OPTIONS,
  HighlightOptions,
} from 'ngx-highlightjs';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarService } from './services/sidebar.service';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { JoinArrayPipe } from './pipes/join-array.pipe';
import { SectionComponent } from './components/section/section.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
import { UserInterfaceComponent } from './view-models/user-interface/user-interface.component';
import { SafePipe } from './pipes/safe.pipe';
import { IframeComponent } from './components/iframe/iframe.component';
import { IframeService } from './services/iframe.service';
import { TabsComponent } from './components/tabs/tabs.component';
import { CodeTabService } from './services/code-tab.service';
import { CodePreviewComponent } from './components/code-preview/code-preview.component';
import { MobileMockupComponent } from './components/mobile-mockup/mobile-mockup.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { XpService } from './services/xp.service';
import { SplitBlockComponent } from './components/split-block/split-block.component';
import { SbService } from './services/sb.service';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { ComparisonSliderComponent } from './components/comparison-slider/comparison-slider.component';

import { ResizeDirective } from './directives/resize.directive';
import { ResizeLrDirective } from './directives/resize-lr.directive';
import { DialogOverlayComponent } from './components/dialog-overlay/dialog-overlay.component';
import { DialogOverlayService } from './services/dialog-overlay.service';
import { DataComponent } from './components/data/data.component';
import { FolderListComponent } from './components/content/folder-list/folder-list.component';
import { ContactComponent } from './view-models/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AppsComponent } from './view-models/apps/apps.component';
import { RcTopNavComponent } from './components/ricreated/rc-top-nav/rc-top-nav.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipService } from './services/tooltip.service';

// Add these two
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LinksService } from './services/links.service';
import { SystemsComponent } from './view-models/systems/systems.component';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}

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
    AboutMeComponent,
    UserInterfaceComponent,
    SafePipe,
    IframeComponent,
    TabsComponent,
    CodePreviewComponent,
    MobileMockupComponent,
    ToastComponent,
    SplitBlockComponent,
    ToggleSwitchComponent,
    ComparisonSliderComponent,
    ResizeDirective,
    ResizeLrDirective,
    DialogOverlayComponent,
    DataComponent,
    FolderListComponent,
    ContactComponent,
    GalleryComponent,
    AppsComponent,
    RcTopNavComponent,
    TooltipComponent,
    SystemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    HighlightModule,
    ScrollingModule,
    ClipboardModule,
    LottieModule.forRoot({ player: playerFactory }),
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
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        themePath: 'node_modules/highlight.js/styles/github.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          scss: () => import('highlight.js/lib/languages/scss'),
        },
      },
    },
    SbService,
    IframeService,
    CodeTabService,
    ToastService,
    XpService,
    DialogOverlayService,
    TooltipService,
    LinksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
