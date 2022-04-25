import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { AlertNotificationService } from 'src/app/services/alertNotification.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-form-cidade',
  templateUrl: './form-cidade.component.html',
  styleUrls: ['./form-cidade.component.css']
})
export class FormCidadeComponent implements OnInit {

  data: any;
  formCidade: FormGroup;
  cidade: Cidade;
  estados: string[];
  noDelete: boolean = true;

  constructor(
    private cidadeService: CidadeService,
    private router: Router,
    private notificationService: AlertNotificationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras.state;
   }

  ngOnInit(): void {
    this.getUf();
    if (this.data.operation == "create") {
      this.createForm();
      this.formCidade.reset();
    } else if (this.data.operation == "update") {
      this.createForm();
      this.formCidade.setValue(this.data.cidade);
    }else if(this.data.operation == 'delete'){
      this.createFormDisabled();
      this.formCidade.setValue(this.data.cidade);
    }
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

  createForm(){
    this.formCidade = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(),
      uf: new FormControl()
    });
  }

  createFormDisabled(){
    this.noDelete = false;
    
    this.formCidade = new FormGroup({
      id: new FormControl({value: "", disabled: true}),
      nome: new FormControl({value: "", disabled: true}),
      uf: new FormControl({value: "", disabled: true})
    });
  }

  create(){
    if(this.formCidade.valid){
      this.cidade = Object.assign({}, this.formCidade.value);
      this.cidade.id = 0;

      this.cidadeService.create(`${Global.BASE_URL_API}/cidade`, this.cidade).subscribe({
        next: returnCidade => {
          this.notificationService.showMessage(returnCidade.message, "success");
          this.router.navigateByUrl("cidades");
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
    if(this.formCidade.valid){
      this.cidade = Object.assign({}, this.formCidade.value);

      this.cidadeService.update(`${Global.BASE_URL_API}/cidade`, this.cidade).subscribe({
        next: returnCidade => {
          this.notificationService.showMessage(returnCidade.message, "success");
          this.router.navigateByUrl("cidades");
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
    this.cidade = Object.assign({}, this.formCidade.value);
      this.cidade.id = this.data.cidade.id;

      this.cidadeService.delete(`${Global.BASE_URL_API}/cidade`, this.cidade.id).subscribe({
        next: returnCidade => {
          this.notificationService.showMessage(returnCidade.message, "success");
          this.router.navigateByUrl("cidades");
        },
        error: returnError => {
          this.notificationService.showMessage(returnError.error, "error");
        }
      });
  }

  getUf(){
    this.estados = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO'
    ]
  }

  cancel(){
    this.router.navigateByUrl("cidades");
  }
}
