import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {
    ProveedorDialogComponent,
    ProveedorDialogData
} from '@components/cevicheria/proveedor-dialog/proveedor-dialog.component';
import {Proveedor, ProveedoresService} from '@services/proveedores.service';
import {
    ConfirmDialogComponent,
    ConfirmDialogData
} from '@components/cevicheria/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-proveedores',
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements AfterViewInit {
    displayedColumns: string[] = ['nombre', 'razonSocial', 'acciones'];
    dataSource = new MatTableDataSource<Proveedor>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly proveedorService = inject(ProveedoresService);
    constructor(private dialog: MatDialog) {}
    ngOnInit() {
        this.proveedorService.getAll().subscribe((proveedores: Proveedor[]) => {
            this.dataSource.data = proveedores;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(ProveedorDialogComponent, {
            width: '500px',
            data: {nombre: '', razonSocial: ''} as ProveedorDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.proveedorService
                    .create(result)
                    .subscribe((newProveedor: Proveedor) => {
                        this.dataSource.data = [
                            ...this.dataSource.data,
                            newProveedor
                        ];
                    });
            }
        });
    }

    openEditDialog(proveedor: Proveedor) {
        const dialogRef = this.dialog.open(ProveedorDialogComponent, {
            width: '500px',
            data: {...proveedor} // Clonamos para no modificar directamente
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.proveedorService
                    .update(proveedor.id, result)
                    .subscribe((updatedProveedor: Proveedor) => {
                        const index = this.dataSource.data.findIndex(
                            (p) => p === proveedor
                        );
                        if (index !== -1) {
                            const updatedData = [...this.dataSource.data];
                            updatedData[index] = updatedProveedor;
                            this.dataSource.data = updatedData;
                        }
                    });
            }
        });
    }

    deleteProveedor(proveedor: Proveedor) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: '¿Confirmar eliminación?',
                message: `¿Estás seguro de eliminar al proveedor "${proveedor.nombre}"?`
            } as ConfirmDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.proveedorService.delete(proveedor.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (p) => p.id !== proveedor.id
                    );
                });
            }
        });
    }
}
