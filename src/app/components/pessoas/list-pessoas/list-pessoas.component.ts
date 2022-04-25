import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-list-pessoas',
  templateUrl: './list-pessoas.component.html',
  styleUrls: ['./list-pessoas.component.css']
})
export class ListPessoasComponent implements OnInit {

  pessoas: any[]=[];
  displayedColumns = ['id', 'nome', 'cpf', 'idade', 'cidadeId', 'action'];
  constructor(
    private pessoaService: PessoaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPessoas();
  }

  getPessoas(){
    this.pessoaService.getAlls(`${Global.BASE_URL_API}/pessoa`).subscribe({
      next: returnPessoas => {
        this.pessoas = returnPessoas.pessoas;
      }
    });
  }

  create(){
    this.router.navigateByUrl("pessoa", {state:{title: "Adicionar Pessoa", btnTitle: "Adicionar", operation: "create"}})
  }

  action(id: number, operationValue: string){
    var pessoa = this.pessoas.find(p => p.id == id);
    if(operationValue == "update"){
      this.router.navigateByUrl("pessoa", {state:{title: "Atualizar Pessoa", btnTitle: "Atualizar", operation: "update", pessoa: pessoa}});
    }else{
      this.router.navigateByUrl("pessoa", {state:{title: "Deletar Pessoa", btnTitle: "Deletar", operation: "delete", pessoa: pessoa}});
    }
  }
}
