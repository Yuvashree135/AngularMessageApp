import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './users/authentication.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './errors/error.component';

import { AuthService } from './users/auth.service';
import { ErrorService } from './errors/error.service';

import { MessageModule } from './messages/message.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpModule,
    MessageModule
  ],
  providers: [ AuthService, ErrorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
