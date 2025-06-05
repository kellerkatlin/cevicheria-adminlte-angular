import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Categoria {
    id?: number;
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    private baseUrl = 'http://localhost:8080/categoria';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.baseUrl}/find/all`);
    }

    getById(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.baseUrl}/find/${id}`);
    }

    create(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.baseUrl}/create`, categoria);
    }

    update(id: number, categoria: Categoria): Observable<Categoria> {
        return this.http.put<Categoria>(
            `${this.baseUrl}/update/${id}`,
            categoria
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
