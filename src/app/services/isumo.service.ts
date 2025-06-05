import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Insumo {
    id?: number;
    cantidadUsada: number;
    fechaUsada: string;
    producto: {id: number};
}

@Injectable({
    providedIn: 'root'
})
export class InsumosService {
    private baseUrl = 'http://localhost:8080/insumo';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Insumo[]> {
        return this.http.get<Insumo[]>(`${this.baseUrl}/find/all`);
    }

    getById(id: number): Observable<Insumo> {
        return this.http.get<Insumo>(`${this.baseUrl}/find/${id}`);
    }

    create(insumo: Insumo): Observable<Insumo> {
        return this.http.post<Insumo>(`${this.baseUrl}/create`, insumo);
    }

    update(id: number, insumo: Insumo): Observable<Insumo> {
        return this.http.put<Insumo>(`${this.baseUrl}/update/${id}`, insumo);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
