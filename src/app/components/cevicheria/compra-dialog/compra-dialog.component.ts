import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Compra} from '@services/compra.service';

@Component({
    selector: 'app-compra-dialog',
    templateUrl: './compra-dialog.component.html',
    styleUrl: './compra-dialog.component.scss'
})
export class CompraDialogComponent {
    readonly dialogRef = inject(MatDialogRef<CompraDialogComponent>);
    readonly data = inject<Compra>(MAT_DIALOG_DATA);

    save() {
        this.dialogRef.close(this.data);
    }
}
