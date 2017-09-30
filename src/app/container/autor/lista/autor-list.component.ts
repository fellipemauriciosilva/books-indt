import {Component, OnInit} from "@angular/core";
import {AuthorApi} from "app/api/module/api/AuthorApi";
import * as models from "app/api/module/model/models";
import {Router} from "@angular/router";
import {DataService} from "app/service/data.service";

@Component({
  selector: 'autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {

  autores: models.Author[];
  author: models.Author;
  page = 0;
  pageAux = 0;
  count = 5;
  filter = '';
  lastPage = false;
  term = '';

  constructor(private authorApi: AuthorApi, private router: Router, private dataService: DataService) {
    this.autores = [];
    this.updateFilter(0);
  }

  ngOnInit(): void {
    this.getAutores();
  }

  public editarOuSalvar(autor?: models.Author): void {
    if (autor)
      this.dataService.saveAuthor(autor);
    this.router.navigate(['./autores/cadastro']);
  }

  public deletar(id: string): void {
    this.authorApi.authorDeleteById(id).subscribe(() => {
        this.getAutores();
      }, err => console.log(err));
  }

  public getTodosAutores(): void {
    this.updateFilter(0);
    this.page = 0;
    this.pageAux = 0;
    this.getAutores();
  }

  public getAutores(): void {
    this.authorApi.authorFind(this.filter).subscribe(autores => {
      this.lastPage = !!(!autores.length || (autores.length && autores.length < this.count));
      this.page = this.pageAux;
      this.autores = autores;
    }, err => console.log(err));
  }

  public goBackToHome(): void {
    this.router.navigate(['./home']);
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
    this.getAutores();
  }

  public next(): void {
    this.pageAux++;
    this.updateFilter(this.count * (this.pageAux));
    this.getAutores();
  }

  updateFilter(offset: number, ): void {
    this.filter = '{"limit": ' + this.count + ', "offset": ' + offset + '}';
  }

  public find() {
    const filterTerm = (this.term == '' ?
      '{"limit": ' + this.count + ', "offset": ' + 0 + '}' :
      '{"where": {"firstName": {"ilike": "' + this.term + '%"  }}, "limit": ' + this.count + ', "offset": ' + 0 + '}');
    this.authorApi.authorFind(filterTerm).subscribe(
      res => this.autores = res
    );
  }

}
