import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Proveedor {
    id?: number;
    nombre: string;
    razonSocial: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProveedoresService {
    private baseUrl = 'http://localhost:8080/proveedor';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(`${this.baseUrl}/find/all`);
    }

    getById(id: number): Observable<Proveedor> {
        return this.http.get<Proveedor>(`${this.baseUrl}/find/${id}`);
    }

    create(proveedor: Proveedor): Observable<Proveedor> {
        return this.http.post<Proveedor>(`${this.baseUrl}/create`, proveedor);
    }

    update(id: number, proveedor: Proveedor): Observable<Proveedor> {
        return this.http.put<Proveedor>(
            `${this.baseUrl}/update/${id}`,
            proveedor
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
