import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./container/home/home.component";
import {BookListComponent} from "app/container/book/lista/book-list.component";
import {BookCadastroComponent} from "app/container/book/cadastro/book-cadastro.component";
import {AutorListComponent} from "./container/autor/lista/autor-list.component";
import {AutorCadastroComponent} from "./container/autor/cadastro/autor-cadastro.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'books',
    component: BookListComponent, pathMatch: 'full'
  },
  {
    path: 'books/cadastro',
    component: BookCadastroComponent, pathMatch: 'full'
  },
  {
    path: 'autores',
    component: AutorListComponent, pathMatch: 'full'
  },
  {
    path: 'autores/cadastro',
    component: AutorCadastroComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule { }
