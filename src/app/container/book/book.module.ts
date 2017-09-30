import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from 'app/api/module/api.module';
import { BookListComponent } from './lista/book-list.component';
import { BookCadastroComponent } from 'app/container/book/cadastro/book-cadastro.component';
import { DataService } from 'app/service/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BookListComponent,
    BookCadastroComponent
  ],
  exports: [
    BookListComponent,
    BookCadastroComponent
  ],
  providers: [
    DataService
  ]
})

export class BookModule {}
