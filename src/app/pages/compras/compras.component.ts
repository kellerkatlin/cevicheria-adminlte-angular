import {Component, inject, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CompraDialogComponent} from '@components/cevicheria/compra-dialog/compra-dialog.component';
import {
    ConfirmDialogComponent,
    ConfirmDialogData
} from '@components/cevicheria/confirm-dialog/confirm-dialog.component';
import {Compra, ComprasService} from '@services/compra.service';

@Component({
    selector: 'app-compras',
    templateUrl: './compras.component.html',
    styleUrl: './compras.component.scss'
})
export class ComprasComponent {
    displayedColumns: string[] = [
        'fechaCompra',
        'cantidad',
        'precioUnitario',
        'montoTotal',
        'producto',
        'proveedor',
        'acciones'
    ];
    dataSource = new MatTableDataSource<Compra>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly comprasService = inject(ComprasService);

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.comprasService.getAll().subscribe((compras) => {
            this.dataSource.data = compras;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CompraDialogComponent, {
            width: '500px',
            data: {
                fechaCompra: '',
                cantidad: 0,
                precioUnitario: 0,
                montoTotal: 0,
                producto: {id: 0},
                proveedor: {id: 0}
            } as Compra
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.comprasService.create(result).subscribe((nuevaCompra) => {
                    this.dataSource.data = [
                        ...this.dataSource.data,
                        nuevaCompra
                    ];
                });
            }
        });
    }

    openEditDialog(compra: Compra) {
        const dialogRef = this.dialog.open(CompraDialogComponent, {
            width: '500px',
            data: {...compra}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.comprasService
                    .update(compra.id!, result)
                    .subscribe((actualizada) => {
                        const index = this.dataSource.data.findIndex(
                            (c) => c === compra
                        );
                        if (index !== -1) {
                            const updatedData = [...this.dataSource.data];
                            updatedData[index] = actualizada;
                            this.dataSource.data = updatedData;
                        }
                    });
            }
        });
    }

    deleteCompra(compra: Compra) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: '¿Confirmar eliminación?',
                message: `¿Estás seguro de eliminar la compra del ${compra.fechaCompra}?`
            } as ConfirmDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.comprasService.delete(compra.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (c) => c.id !== compra.id
                    );
                });
            }
        });
    }
}
