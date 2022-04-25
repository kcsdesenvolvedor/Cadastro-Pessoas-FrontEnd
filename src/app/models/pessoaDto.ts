import { Cidade } from "./cidade";

export class PessoaDto{
    id: number;
    nome: string;
    cpf: string;
    idade: number;
    cidade?: string;
    uf?: string;


}