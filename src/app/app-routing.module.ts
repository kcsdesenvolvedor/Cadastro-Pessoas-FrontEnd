import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormCidadeComponent } from "./components/cidades/form-cidade/form-cidade.component";
import { ListCidadesComponent } from "./components/cidades/list-cidades/list-cidades.component";
import { HomeComponent } from "./components/home/home.component";
import { FormPessoaComponent } from "./components/pessoas/form-pessoa/form-pessoa.component";
import { ListPessoasComponent } from "./components/pessoas/list-pessoas/list-pessoas.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "pessoas", component: ListPessoasComponent},
    {path: "pessoa", component: FormPessoaComponent},
    {path: "cidades", component: ListCidadesComponent},
    {path: "cidade", component: FormCidadeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}