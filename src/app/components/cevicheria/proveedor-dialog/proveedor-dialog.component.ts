import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
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
