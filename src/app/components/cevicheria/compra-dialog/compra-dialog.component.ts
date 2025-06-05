import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Compra} from '@services/compra.service';
import {Producto, ProductosService} from '@services/productos.service';
import {Proveedor, ProveedoresService} from '@services/proveedores.service';

@Component({
    selector: 'app-compra-dialog',
    templateUrl: './compra-dialog.component.html',
    styleUrl: './compra-dialog.component.scss'
})
export class CompraDialogComponent implements OnInit {
    readonly dialogRef = inject(MatDialogRef<CompraDialogComponent>);
    readonly data = inject<Compra>(MAT_DIALOG_DATA);
    productosOptions: Producto[] = [];
    proveedoresOptions: Proveedor[] = [];
    private readonly productoService = inject(ProductosService);
    private readonly proveedorService = inject(ProveedoresService);

    ngOnInit(): void {
        this.productoService.getAll().subscribe((productos) => {
            this.productosOptions = productos;
        });

        this.proveedorService.getAll().subscribe((proveedores) => {
            this.proveedoresOptions = proveedores;
        });
    }

    recalcularMontoTotal() {
        const cantidad = this.data.cantidad ?? 0;
        const precio = this.data.precioUnitario ?? 0;
        this.data.montoTotal = cantidad * precio;
    }

    onProductoChange(id: number) {
        this.data.producto = {id};
    }

    onProveedorChange(id: number) {
        this.data.proveedor = {id};
    }
    save() {
        this.dialogRef.close(this.data);
    }
}
