import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuHeaderComponent } from './components/side-menu/components/menu-header/menu-header.component';
import { MenuEntryComponent } from './components/side-menu/components/menu-entry/menu-entry.component';
import { ControlViewComponent } from './components/control-view/control-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    MenuHeaderComponent,
    MenuEntryComponent,
    ControlViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
