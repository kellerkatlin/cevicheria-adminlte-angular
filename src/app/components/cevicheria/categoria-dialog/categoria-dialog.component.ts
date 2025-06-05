import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Categoria} from '@services/categorias.service';

@Component({
    selector: 'app-categoria-dialog',
    templateUrl: './categoria-dialog.component.html',
    styleUrl: './categoria-dialog.component.scss'
})
export class CategoriaDialogComponent {
    readonly dialogRef = inject(MatDialogRef<CategoriaDialogComponent>);
    readonly data = inject<Categoria>(MAT_DIALOG_DATA);

    save() {
        this.dialogRef.close(this.data);
    }
}
