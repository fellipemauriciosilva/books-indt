import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import * as models from 'app/api/module/model/models';

@Injectable()
export class DataService {

  // Observable dos dados
  private book: BehaviorSubject<models.Book> = new BehaviorSubject<models.Book>(null);
  private author: BehaviorSubject<models.Author> = new BehaviorSubject<models.Author>(null);

// Observable do canal por onde os dados passam
  book$ = this.book.asObservable();
  autor$ = this.author.asObservable();

  // serviço para atualização dos dados
  saveBook(data: models.Book): void {
    this.book.next(data);
  }

  clearBook(): void {
    this.book.next(null);
  }

  saveAuthor(data: models.Author): void {
    this.author.next(data);
  }

  clearAuthor(): void {
    this.author.next(null);
  }
}
