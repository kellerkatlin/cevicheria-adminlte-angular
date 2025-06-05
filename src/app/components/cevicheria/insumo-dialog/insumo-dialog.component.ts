import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Insumo, InsumosService} from '@services/isumo.service';
import {Producto, ProductosService} from '@services/productos.service';

@Component({
    selector: 'app-insumo-dialog',
    templateUrl: './insumo-dialog.component.html',
    styleUrl: './insumo-dialog.component.scss'
})
export class InsumoDialogComponent implements OnInit {
    readonly dialogRef = inject(MatDialogRef<InsumoDialogComponent>);
    readonly data = inject<Insumo>(MAT_DIALOG_DATA);
    productosOptions: Producto[] = [];
    private readonly productoService = inject(ProductosService);

    ngOnInit(): void {
        this.productoService.getAll().subscribe((productos) => {
            this.productosOptions = productos;
        });
    }

    onProductoChange(id: number) {
        this.data.producto = {id};
    }

    save() {
        this.dialogRef.close(this.data);
    }
}
