import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Compra {
    id?: number;
    cantidad: number;
    fechaCompra: string;
    montoTotal: number;
    precioUnitario: number;
    producto: {
        id: number;
        nombre?: string;
        unidadMedida?: string;
        categoria?: {
            id: number;
            nombre: string;
        };
    };

    proveedor: {
        id: number;
        razonSocial?: string;
        nombre?: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ComprasService {
    private baseUrl = 'http://localhost:8080/compra';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Compra[]> {
        return this.http.get<Compra[]>(`${this.baseUrl}/find/all`);
    }

    getById(id: number): Observable<Compra> {
        return this.http.get<Compra>(`${this.baseUrl}/find/${id}`);
    }

    create(compra: Compra): Observable<Compra> {
        return this.http.post<Compra>(`${this.baseUrl}/create`, compra);
    }

    update(id: number, compra: Compra): Observable<Compra> {
        return this.http.put<Compra>(`${this.baseUrl}/update/${id}`, compra);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
