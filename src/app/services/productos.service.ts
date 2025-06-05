import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Producto {
    id?: number;
    nombre: string;
    unidadMedida: string;
    categoria: {id: number};
}

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    private baseUrl = 'http://localhost:8080/producto';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.baseUrl}/find/all`);
    }

    getById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.baseUrl}/find/${id}`);
    }

    create(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(`${this.baseUrl}/create`, producto);
    }

    update(id: number, producto: Producto): Observable<Producto> {
        return this.http.put<Producto>(
            `${this.baseUrl}/update/${id}`,
            producto
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
