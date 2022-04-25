import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cidade } from "../models/cidade";


@Injectable({
    providedIn: 'root'
})

export class CidadeService{
    constructor(private http: HttpClient){

    }

    getAlls(url: string): Observable<any>{
        return this.http.get<any>(url);
    }

    getById(url: string, id: number): Observable<any>{
        var newUrl = `${url}/${id}`;
        return this.http.get<any>(newUrl);
    }

    create(url: string, cidade: Cidade): Observable<any>{
        return this.http.post<any>(url, cidade);
    }

    update(url: string, cidade: Cidade): Observable<any>{
        var newUrl = `${url}/${cidade.id}`;
        return this.http.put<any>(newUrl, cidade);
    }

    delete(url: string, id: number): Observable<any>{
        var newUrl = `${url}/${id}`;
        return this.http.delete<any>(newUrl);
    }
}