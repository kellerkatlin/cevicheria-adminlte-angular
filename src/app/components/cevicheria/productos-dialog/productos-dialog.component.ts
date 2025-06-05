import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Producto} from '@services/productos.service';

@Component({
    selector: 'app-productos-dialog',
    templateUrl: './productos-dialog.component.html',
    styleUrl: './productos-dialog.component.scss'
})
export class ProductosDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ProductosDialogComponent>);
    readonly data = inject<Producto>(MAT_DIALOG_DATA);

    save() {
        this.dialogRef.close(this.data);
    }
}
