import {Component, OnDestroy, OnInit} from "@angular/core";
import {BookApi} from "app/api/module/api/BookApi";
import {AuthorApi} from "app/api/module/api/AuthorApi";
import * as models from "app/api/module/model/models";
import {Router} from "@angular/router";
import {DataService} from "app/service/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'book-cadastro',
  templateUrl: './book-cadastro.component.html',
  styleUrls: ['./book-cadastro.component.css']
})
export class BookCadastroComponent implements OnInit, OnDestroy {

  form: FormGroup;
  book: models.Book;
  author: models.Author;
  authors: models.Author[];
  title = 'Cadastrar novo livro';
  isEdit = false;
  errors = {
    titulo: '',
    autor: ''
  };

  constructor(private bookApi: BookApi, private authorApi: AuthorApi, private dataService: DataService, private router: Router,
              private formBuilder: FormBuilder) {
    this.author = {
      id: undefined,
      firstName: undefined,
      lastName: undefined
    };
  }

  ngOnInit(): void {
    this.authorApi.authorFind().subscribe(data => {
      this.authors = data;
      if (this.book && this.book.authorId) {
        const index = this.authors.findIndex(item => item.id === this.book.authorId);
        if (index !== -1)
          this.author = this.authors[index];
      }
    }, err => console.log(err));
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.dataService.clearBook();
  }

  back(): void {
    this.router.navigate(['./books']);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
    });

    this.dataService.book$.subscribe(book => {
      this.book = book;
    });
    if (this.book) {
      this.isEdit = true;
      this.title = 'Editar';
      this.form.get('titulo').setValue(this.book.title);
    }
  }

  validateField(campo: string): string {
    const control = this.form.get(campo);
    if (this.form.get(campo))
      if (control && !control.valid) {
        return this.errors[campo] = 'Campo obrigatório';
      }
  }

  salvar(): void {
    if (this.form.invalid)
      return this.validarForm();
    const book = {
      id: this.book ? this.book.id : undefined,
      title: this.form.get('titulo').value,
      authorId: this.form.get('autor').value
    };
    if (this.isEdit)
      this.bookApi.bookReplaceByIdPutBooksid(book.id.toString(), book)
        .subscribe(data => {
        this.salvoComSucesso(data);
      }, err => this.erro(err));
    else
      this.bookApi.bookCreate(book).subscribe(data => {
        this.salvoComSucesso(data);
      }, err => this.erro(err));
  }

  validarForm(): void {
    for (const key in this.form.controls) {
      this.errors[key] = this.validateField(key);
    }
  }

  salvoComSucesso(data: any) {
    console.log('livro salvo com sucesso');
    console.log(data);
    this.router.navigate(['./books']);
  }

  erro(err: any) {
    console.log('erro ao salvar o livro');
    console.log(err);
  }
}
