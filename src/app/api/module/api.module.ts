import { NgModule } from '@angular/core';

import { AuthorApi } from './api/AuthorApi';
import { BookApi } from './api/BookApi';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BASE_PATH } from './variables';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.origin },
    AuthorApi,
    BookApi
  ]
})

export class ApiModule { }
