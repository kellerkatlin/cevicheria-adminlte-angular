import {Component, inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface ProveedorDialogData {
    nombre: string;
    razonSocial: string;
}

@Component({
    selector: 'app-proveedor-dialog',
    templateUrl: './proveedor-dialog.component.html',
    styleUrl: './proveedor-dialog.component.scss'
})
export class ProveedorDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ProveedorDialogComponent>);
    readonly data = inject<ProveedorDialogData>(MAT_DIALOG_DATA);

    save() {
        this.dialogRef.close(this.data);
    }
}
