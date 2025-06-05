import {Component, inject, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CategoriaDialogComponent} from '@components/cevicheria/categoria-dialog/categoria-dialog.component';
import {
    ConfirmDialogComponent,
    ConfirmDialogData
} from '@components/cevicheria/confirm-dialog/confirm-dialog.component';
import {Categoria, CategoriasService} from '@services/categorias.service';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
    displayedColumns: string[] = ['nombre', 'acciones'];
    dataSource = new MatTableDataSource<Categoria>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly categoriaService = inject(CategoriasService);

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.categoriaService.getAll().subscribe((categorias) => {
            this.dataSource.data = categorias;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CategoriaDialogComponent, {
            width: '500px',
            data: {nombre: ''} as Categoria
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.categoriaService
                    .create(result)
                    .subscribe((nuevaCategoria) => {
                        this.dataSource.data = [
                            ...this.dataSource.data,
                            nuevaCategoria
                        ];
                    });
            }
        });
    }

    openEditDialog(categoria: Categoria) {
        const dialogRef = this.dialog.open(CategoriaDialogComponent, {
            width: '500px',
            data: {...categoria}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.categoriaService
                    .update(categoria.id, result)
                    .subscribe((actualizada) => {
                        const index = this.dataSource.data.findIndex(
                            (c) => c === categoria
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

    deleteCategoria(categoria: Categoria) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: '¿Confirmar eliminación?',
                message: `¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`
            } as ConfirmDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.categoriaService.delete(categoria.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (c) => c.id !== categoria.id
                    );
                });
            }
        });
    }
}
