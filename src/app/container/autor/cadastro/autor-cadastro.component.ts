import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthorApi} from "app/api/module/api/AuthorApi";
import * as models from "app/api/module/model/models";
import {Router} from "@angular/router";
import {DataService} from "app/service/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'autor-cadastro',
  templateUrl: './autor-cadastro.component.html',
  styleUrls: ['./autor-cadastro.component.css']
})
export class AutorCadastroComponent implements OnInit, OnDestroy {

  form: FormGroup;
  autor: models.Author;
  autores: models.Author[];
  title = 'Cadastrar novo autor';
  isEdit = false;
  errors = {
    firstName: '',
    lastName: ''
  };

  constructor(private authorApi: AuthorApi, private dataService: DataService, private router: Router,
              private formBuilder: FormBuilder) {
    this.autor = {
      id: undefined,
      firstName: undefined,
      lastName: undefined
    };
  }

  ngOnInit(): void {
    this.authorApi.authorFind().subscribe(data => {
      this.autores = data;
    }, err => console.log(err));
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.dataService.clearAuthor();
  }

  back(): void {
    this.router.navigate(['./autores']);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.dataService.autor$.subscribe(autor => {
      this.autor = autor;
    });
    if (this.autor) {
      this.isEdit = true;
      this.title = 'Editar';
      this.form.get('firstName').setValue(this.autor.firstName);
      this.form.get('lastName').setValue(this.autor.lastName);
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
    const autor = {
      id: this.autor ? this.autor.id : undefined,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value
    };
    if (this.isEdit)
      this.authorApi.authorReplaceByIdPutAuthorsid(autor.id.toString(), autor)
        .subscribe(data => {
          this.salvoComSucesso(data);
        }, err => this.erro(err));
    else
      this.authorApi.authorCreate(autor)
        .subscribe(data => {
          this.salvoComSucesso(data);
        }, err => this.erro(err));
  }

  validarForm(): void {
    for (const key in this.form.controls) {
      this.errors[key] = this.validateField(key);
    }
  }

  salvoComSucesso(data: any) {
    console.log('Autor salvo com sucesso');
    console.log(data);
    this.router.navigate(['./autores']);
  }

  erro(err: any) {
    console.log('erro ao salvar o Autor');
    console.log(err);
  }
}
