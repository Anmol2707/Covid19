import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {PanelModule} from 'primeng/panel';
import {GMapModule} from 'primeng/gmap';
import {CardModule} from 'primeng/card';


import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar/topbar.component';

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        SidebarModule,
        MatToolbarModule,
        PanelModule,
        GMapModule,
        CardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
