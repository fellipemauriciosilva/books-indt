import {Component, OnInit} from "@angular/core";
import {BookApi} from "app/api/module/api/BookApi";
import {AuthorApi} from "app/api/module/api/AuthorApi";
import * as models from "app/api/module/model/models";
import {Router} from "@angular/router";
import {DataService} from "app/service/data.service";

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: models.Book[];
  authors: models.Author[];
  author: models.Author;
  page = 0;
  pageAux = 0;
  count = 5;
  filter = '';
  lastPage = false;
  term = '';

  constructor(private bookApi: BookApi, private authorApi: AuthorApi, private router: Router, private dataService: DataService) {
    this.books = [];
    this.updateFilter(0);
  }

  ngOnInit(): void {
    this.authorApi.authorFind().subscribe(authors => {
      this.authors = authors;
      this.getBooks();
    }, err => console.log(err));
  }

  public getAuthorById(id: number): models.Author {
    const index = this.authors.findIndex(x => x.id === id);
    return this.authors[index];
  }

  public getBooksByAuthor(author: models.Author): void {
    this.authorApi.authorPrototypeGetBooks(author.id.toString()).subscribe(data => {
      this.books = data;
      this.author = author;
    });
  }

  public getTodosBooks(): void {
    this.updateFilter(0);
    this.page = 0;
    this.pageAux = 0;
    this.getBooks();
  }

  public getBooks(): void {
    this.bookApi.bookFind(this.filter).subscribe(books => {
      this.lastPage = !!(!books.length || (books.length && books.length < this.count));
      this.page = this.pageAux;
      this.books = books;
    }, err => console.log(err));
  }

  public editarOuSalvar(book?: models.Book): void {
    if (book)
      this.dataService.saveBook(book);
    this.router.navigate(['./books/cadastro']);
  }

  public getAuthorByBook(book: models.Book): string {
    if (book.authorId) {
      const index = this.authors.findIndex(item => item.id === book.authorId);
      if (index !== -1)
        return this.authors[index].firstName + ' ' + this.authors[index].lastName;
    }
    return 'Sem autor';
  }

  public goBackToHome(): void {
    this.router.navigate(['./home']);
  }

  public deletar(id: string): void {
    this.bookApi.bookDeleteById(id).subscribe(() => {
      this.getBooks();
    }, err => console.log(err));
  }

  public back(page): void {
    if (page) {
      this.pageAux = page;
      this.updateFilter(this.pageAux);
    }
    else {
      this.pageAux--;
      this.updateFilter(this.count * (this.pageAux));
    }
    this.getBooks();
  }

  public next(): void {
    this.pageAux++;
    this.updateFilter(this.count * (this.pageAux));
    this.getBooks();
  }

  updateFilter(offset: number): void {
    this.filter = '{"limit": ' + this.count + ', "offset": ' + offset + '}';
  }

  public find() {
    const filterTerm = (this.term == '' ?
      '{"limit": ' + this.count + ', "offset": ' + 0 + '}' : 
      '{"where": {"title": {"ilike": "' + this.term + '%"  }}, "limit": ' + this.count + ', "offset": ' + 0 + '}');
    this.bookApi.bookFind(filterTerm).subscribe(books => {
      this.lastPage = !!(!books.length || (books.length && books.length < this.count));
      this.page = this.pageAux;
      this.books = books;
    }, err => console.log(err));
  }
}
