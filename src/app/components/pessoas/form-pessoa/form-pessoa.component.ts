import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { Pessoa } from 'src/app/models/pessoa';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-form-pessoa',
  templateUrl: './form-pessoa.component.html',
  styleUrls: ['./form-pessoa.component.css']
})
export class FormPessoaComponent implements OnInit {

  data: any;
  pessoa: Pessoa;
  pessoaForm: FormGroup;
  cidadeFormControl: FormControl;
  cidades: Cidade[];
  noDelete = true;

  constructor(
    private router: Router,
    private pessoaService: PessoaService,
    private cidadeService: CidadeService,
    private notificationService: AlertNotificationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras.state;
   }

  ngOnInit(): void {
    this.getCidades();
    
  }

  createForm(){
    this.pessoaForm = new FormGroup({
      id: new FormControl({value: "", require: true}),
      nome: new FormControl({value: "", require: true}),
      cpf: new FormControl({value: "", require: true}),
      idade: new FormControl({value: "", require: true}),
      cidadeId: new FormControl({value: "", require: true})
    });
  }

  createFormDisable(){
    this.noDelete = false;
    var cidade = this.cidades.find(c => c.id == this.data.pessoa.cidadeId);
    this.cidadeFormControl = new FormControl({value: `${cidade?.nome} - ${cidade?.uf}`, disabled: true});

    this.pessoaForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      nome: new FormControl({ value: '', disabled: true }),
      cpf: new FormControl({ value: '', disabled: true }),
      idade: new FormControl({ value: '', disabled: true }),
      cidadeId: new FormControl(cidade?.nome)
    });
  }

  getCidades(){
    this.cidadeService.getAlls(`${Global.BASE_URL_API}/cidade`).subscribe({
      next: returnCidades =>{
        this.cidades = returnCidades.cidades;
        if (this.data.operation == "create") {
          this.createForm();
          this.pessoaForm.reset();
        } else if (this.data.operation == "update") {
          this.createForm();
          this.pessoaForm.setValue(this.data.pessoa);
        }else if(this.data.operation == 'delete'){
          this.createFormDisable();
          this.pessoaForm.setValue(this.data.pessoa);
        }
      }
    });
  }

  onSubmit(){
    if(this.data.operation == "create"){
      this.create();
    }else if(this.data.operation == "update"){
      this.update();
    }else{
      this.delete();
    }
  }

  create(){
    if(this.pessoaForm.valid){
      this.pessoa = Object.assign({}, this.pessoaForm.value);
      this.pessoa.id = 0;
      Number(this.pessoa.idade);
      Number(this.pessoa.cidadeId);

      this.pessoaService.create(`${Global.BASE_URL_API}/pessoa`, this.pessoa).subscribe({
        next: returnPessoa => {
          this.notificationService.showMessage(returnPessoa.message, "success");
          this.router.navigateByUrl("");
        },
        error: returnError => {
          this.notificationService.showMessage(returnError.error, "error");
        }
      });
    }else {
      this.notificationService.showMessage("Por favor, preencha todos os campos corretamente!", "warning");
    }
  }

  update(){
    if(this.pessoaForm.valid){
      this.pessoa = Object.assign({}, this.pessoaForm.value);
      Number(this.pessoa.id);
      Number(this.pessoa.idade);
      Number(this.pessoa.cidadeId);

      this.pessoaService.update(`${Global.BASE_URL_API}/pessoa`, this.pessoa).subscribe({
        next: returnPessoa => {
          this.notificationService.showMessage(returnPessoa.message, "success");
          this.router.navigateByUrl("");
        },
        error: returnError => {
          this.notificationService.showMessage(returnError.error, "error");
        }
      });
    }else {
      this.notificationService.showMessage("Por favor, preencha todos os campos corretamente!", "warning");
    }
  }

  delete(){
    this.pessoa = Object.assign({}, this.pessoaForm.value);
    this.pessoa.id = this.data.pessoa.id;
    this.pessoaService.delete(`${Global.BASE_URL_API}/pessoa`, this.pessoa.id).subscribe({
      next: returnPessoas => {
        this.notificationService.showMessage(returnPessoas.message, "success");
        this.router.navigateByUrl("");
      },
      error: returnError => {
        this.notificationService.showMessage(returnError.error, "error");
      }
    });
  }

  cancel(){
    this.router.navigateByUrl("");
  }

}
