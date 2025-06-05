import {Component, inject, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {
    ConfirmDialogComponent,
    ConfirmDialogData
} from '@components/cevicheria/confirm-dialog/confirm-dialog.component';
import {InsumoDialogComponent} from '@components/cevicheria/insumo-dialog/insumo-dialog.component';
import {Insumo, InsumosService} from '@services/isumo.service';

@Component({
    selector: 'app-insumos',
    templateUrl: './insumos.component.html',
    styleUrl: './insumos.component.scss'
})
export class InsumosComponent {
    displayedColumns: string[] = [
        'fechaUsada',
        'cantidadUsada',
        'producto',
        'acciones'
    ];
    dataSource = new MatTableDataSource<Insumo>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly insumosService = inject(InsumosService);

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.insumosService.getAll().subscribe((insumos) => {
            this.dataSource.data = insumos;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(InsumoDialogComponent, {
            width: '500px',
            data: {
                fechaUsada: '',
                cantidadUsada: 0,
                producto: {id: 0}
            } as Insumo
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.insumosService.create(result).subscribe(() => {
                    this.insumosService.getAll().subscribe((insumos) => {
                        this.dataSource.data = insumos;
                    });
                });
            }
        });
    }

    openEditDialog(insumo: Insumo) {
        const dialogRef = this.dialog.open(InsumoDialogComponent, {
            width: '500px',
            data: {...insumo}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.insumosService.update(insumo.id, result).subscribe(() => {
                    this.insumosService.getAll().subscribe((insumos) => {
                        this.dataSource.data = insumos;
                    });
                });
            }
        });
    }

    deleteInsumo(insumo: Insumo) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: '¿Confirmar eliminación?',
                message: `¿Estás seguro de eliminar el insumo usado el ${insumo.fechaUsada}?`
            } as ConfirmDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.insumosService.delete(insumo.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (i) => i.id !== insumo.id
                    );
                });
            }
        });
    }
}
