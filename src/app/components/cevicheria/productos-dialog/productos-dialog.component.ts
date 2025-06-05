import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Categoria, CategoriasService} from '@services/categorias.service';
import {Producto} from '@services/productos.service';

@Component({
    selector: 'app-productos-dialog',
    templateUrl: './productos-dialog.component.html',
    styleUrl: './productos-dialog.component.scss'
})
export class ProductosDialogComponent implements OnInit {
    readonly dialogRef = inject(MatDialogRef<ProductosDialogComponent>);
    readonly data = inject<Producto>(MAT_DIALOG_DATA);
    private readonly categoriaService = inject(CategoriasService);
    categoriaOptions: Categoria[] = [];
    unidadMedidaOptions = [
        {value: 'kg', label: 'Kilogramo'},
        {value: 'g', label: 'Gramo'},
        {value: 'l', label: 'Litro'},
        {value: 'ml', label: 'Mililitro'},
        {value: 'unidad', label: 'Unidad'}
    ];

    ngOnInit(): void {
        this.categoriaService.getAll().subscribe((categorias) => {
            this.categoriaOptions = categorias;
        });
    }

    onCategoriaChange(id: number) {
        this.data.categoria = {id};
    }
    onUnidadMedidaChange(value: string) {
        this.data.unidadMedida = value;
    }

    save() {
        this.dialogRef.close(this.data);
    }
}
