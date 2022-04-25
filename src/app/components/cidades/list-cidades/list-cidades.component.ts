import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { CidadeService } from 'src/app/services/cidade.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-list-cidades',
  templateUrl: './list-cidades.component.html',
  styleUrls: ['./list-cidades.component.css']
})
export class ListCidadesComponent implements OnInit {

  cidades: Cidade[];
  displayedColumns = ['id', 'nome', 'uf', 'action'];

  constructor(
    private cidadeService: CidadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCidades();
  }

  getCidades(){
    this.cidadeService.getAlls(`${Global.BASE_URL_API}/cidade`).subscribe({
      next: returnCidades => {
        this.cidades = returnCidades.cidades;
      }
    });
  }

  create(){
    this.router.navigateByUrl("cidade", {state: {title: "Adicionar Cidade", btnTitle: "Adicionar", operation: "create"}});
  }

  action(id: number, operationValue: string){
    var cidade = this.cidades.find(c => c.id == id);
    if(operationValue == "update"){
      this.router.navigateByUrl("cidade", {state: {title: "Atualizar Cidade", btnTitle: "Atualizar", operation: "update", cidade: cidade}});
    }else{
      this.router.navigateByUrl("cidade", {state: {title: "Deletar Cidade", btnTitle: "Deletar", operation: "delete", cidade: cidade}});
    }
  }

}
