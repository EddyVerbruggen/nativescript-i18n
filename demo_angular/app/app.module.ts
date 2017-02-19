// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptI18nModule } from 'nativescript-i18n/angular';

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { MainPageComponent } from "./main-page";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
    
        NativeScriptI18nModule, 
        
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MainPageComponent
    ],
    
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
