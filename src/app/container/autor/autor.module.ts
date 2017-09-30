import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ApiModule} from "app/api/module/api.module";
import {DataService} from "app/service/data.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutorCadastroComponent} from "./cadastro/autor-cadastro.component";
import {AutorListComponent} from "./lista/autor-list.component";

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AutorCadastroComponent,
    AutorListComponent
  ],
  exports: [
    AutorCadastroComponent,
    AutorListComponent
  ],
  providers: [
    DataService
  ]
})

export class AutorModule {}
