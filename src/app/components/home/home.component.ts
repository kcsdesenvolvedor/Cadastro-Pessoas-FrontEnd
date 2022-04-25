import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/models/cidade';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaDto } from 'src/app/models/pessoaDto';
import { CidadeService } from 'src/app/services/cidade.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  pessoas: any[]=[];
  cadastro: any[];
  cidades: Cidade[]=[];
  displayedColumns = ['id', 'nome', 'cpf', 'idade', 'cidade', 'uf'];

  constructor(
    private pessoaService: PessoaService,
    private cidadeService: CidadeService
  ) { }

  ngOnInit(): void {
    this.getListPessoas();
  }

  getListPessoas(){
    this.pessoaService.getAlls(`${Global.BASE_URL_API}/pessoa`).subscribe({
      next: returnPessoas =>{
        
        this.cidadeService.getAlls(`${Global.BASE_URL_API}/cidade`).subscribe({
          next: returnCidade => {

            this.cidades = returnCidade.cidades;
    
            returnPessoas.pessoas.forEach((value: any) => {
              this.pessoas.push({
                id: value.id,
                nome: value.nome,
                cpf: value.cpf,
                idade: value.idade,
                cidade: this.cidades.find(c => c.id == value.cidadeId)?.nome,
                uf: this.cidades.find(c => c.id == value.cidadeId)?.uf
              });
            });
            this.cadastro = this.pessoas;
          }
        });
      }
    });

  }

}
