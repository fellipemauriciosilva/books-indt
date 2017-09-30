import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {AppRoutesModule} from "./app-routes.module";
import {DashboardModule} from "./container/home/home.module";
import {BookModule} from "app/container/book/book.module";
import {AutorModule} from "./container/autor/autor.module";

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutesModule,
    BookModule,
    AutorModule
  ],
  declarations: [
    AppComponent,
    MainContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
