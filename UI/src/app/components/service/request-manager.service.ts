import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestManagerService
{
    host: string = "localhost";
    port: number = 8080;
    address: string;

    constructor(private http: Http)
    {
        this.address = "http://" + this.host + ":" + this.port + "/";
    }

    getRoot(): Observable<any>
    {
        return this.http
                    .get(this.address)
                    .map(response => response.status);
    }

    getRecipes(): Observable<any>
    {
        return this.http
                    .get(this.address  + "recipes")
                    .map(response => response.json());
    }

    getUnits(): Observable<any>
    {
        return this.http
                    .get(this.address  + "units")
                    .map(response => response.json());
    }

    getTemperature(unit_id: number): Observable<any>
    {
        return this.http
                    .get(this.address  + "temperature/" + unit_id)
                    .map(response => response.json());
    }

    getPH(unit_id: number): Observable<any>
    {
        return this.http
                    .get(this.address  + "ph/" + unit_id)
                    .map(response => response.json());
    }

    getAlcohol(unit_id: number): Observable<any>
    {
        return this.http
                    .get(this.address  + "alcohol/" + unit_id)
                    .map(response => response.json());
    }

    getSugar(unit_id: number): Observable<any>
    {
        return this.http
                    .get(this.address  + "sugar/" + unit_id)
                    .map(response => response.json());
    }

    updateUnitParam(data: any): Observable<any>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
                    .put(this.address + 'units', JSON.stringify(data), {headers: headers})
                    .map(response => response.json());
    }

    postNewRecipe(data: any): Observable<any>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
                    .post(this.address + 'recipes', JSON.stringify(data), {headers: headers})
                    .map(response => response.json());
    }

    postNewUnit(data: any): Observable<any>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
                    .post(this.address + 'units', JSON.stringify(data), {headers: headers})
                    .map(response => response.json());
    }
}