import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Almacen {
    id?: number;
    stock: number;
    fecha_ingreso: string;
    producto: {
        id: number;
        nombre: string;
        unidadMedida: string;
        categoria: {
            id: number;
            nombre: string;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class AlmacenService {
    private baseUrl = 'http://localhost:8080/almacen';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Almacen[]> {
        return this.http.get<Almacen[]>(`${this.baseUrl}/find/all`);
    }
}
