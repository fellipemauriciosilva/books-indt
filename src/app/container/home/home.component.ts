import {Component, OnInit} from "@angular/core";
import {BookApi} from "../../api/module/api/BookApi";
import {AuthorApi} from "../../api/module/api/AuthorApi";
import * as models from "../../api/module/model/models";
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: models.Book[];
  authors: models.Author[];
  author: models.Author;
  count: number = 5;
  page: number = 0;
  pageAux: number = 0;
  active: boolean;
  filter = '';
  lastPage = false;

  constructor(private bookApi: BookApi, private authorApi: AuthorApi, private dataService: DataService, private router: Router) {
    this.books = [];
    this.active = true;
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
    this.updateFilter(0);
    this.authorApi.authorPrototypeGetBooks(author.id.toString(), this.filter).subscribe(books => {
      this.fillBooks(books);
      this.author = author;
      this.page = 0;
      this.pageAux = 0;
    });
  }

  public getTodosLivros(): void {
    this.updateFilter(0);
    this.getBooks();
  }

  public getBooks(fromPage?: boolean): void {
    this.bookApi.bookFind(this.filter).subscribe(books => {
      this.fillBooks(books);
    }, err => console.log(err));
  }

  public fillBooks(books: models.Book[]): void {
    this.lastPage = !!(!books.length || (books.length && books.length < this.count));
    this.page = this.pageAux;
    this.books = books;
  }

  public novoAutorOuLivro(isAutor: boolean): void {
    let rota = './books/cadastro';
    if (isAutor)
      rota = './autores/cadastro';
    this.router.navigate([rota]);
  }

  public editarOuSalvar(book?: models.Book): void {
    if (book)
      this.dataService.saveBook(book);
    this.router.navigate(['./books/cadastro']);
  }

  public deletar(id: string): void {
    this.bookApi.bookDeleteById(id).subscribe(() => {
      this.getBooks();
    }, err => console.log(err));
  }

  public back(page): void {
    if (page) {
      this.pageAux = page;
      this.updateFilter(this.page);
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

  updateFilter(offset: number, ): void {
    this.filter = '{"limit": ' + this.count + ', "offset": ' + offset + '}';
  }
}
