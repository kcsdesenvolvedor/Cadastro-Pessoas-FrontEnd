import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pessoa } from "../models/pessoa";

@Injectable({
    providedIn: 'root'
})

export class PessoaService{

    constructor(private http: HttpClient){

    }

    getAlls(url: string): Observable<any>{
        return this.http.get<any>(url);
    }

    getById(url: string, id: number): Observable<any>{
        var newUrl = `${url}/${id}`;
        return this.http.get<any>(newUrl);
    }

    create(url: string, pessoa: Pessoa): Observable<any>{
        return this.http.post<any>(url, pessoa);
    }

    update(url: string, pessoa: Pessoa): Observable<any>{
        var newUrl = `${url}/${pessoa.id}`;
        return this.http.put<any>(newUrl, pessoa);
    }

    delete(url: string, id: number): Observable<any>{
        var newUrl = `${url}/${id}`;
        return this.http.delete<any>(newUrl);
    }
}