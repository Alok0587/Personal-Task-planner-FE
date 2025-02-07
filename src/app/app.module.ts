import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import { ChatComponent } from './components/chat/chat.component';
import {HttpClientModule} from "@angular/common/http";
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ChatHistoryComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
      HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
