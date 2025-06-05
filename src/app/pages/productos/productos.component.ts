import {Component, inject, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {
    ConfirmDialogComponent,
    ConfirmDialogData
} from '@components/cevicheria/confirm-dialog/confirm-dialog.component';
import {ProductosDialogComponent} from '@components/cevicheria/productos-dialog/productos-dialog.component';
import {Categoria, CategoriasService} from '@services/categorias.service';
import {Producto, ProductosService} from '@services/productos.service';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.scss'
})
export class ProductosComponent {
    displayedColumns: string[] = [
        'nombre',
        'unidadMedida',
        'categoria',
        'acciones'
    ];
    dataSource = new MatTableDataSource<Producto>([]);

    categoriaOptions: Categoria[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly productoService = inject(ProductosService);
    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.productoService.getAll().subscribe((productos) => {
            this.dataSource.data = productos;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(ProductosDialogComponent, {
            width: '500px',
            data: {
                nombre: '',
                unidadMedida: '',
                categoria: {id: 0}
            } as Producto
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productoService
                    .create(result)
                    .subscribe((nuevoProducto) => {
                        this.dataSource.data = [
                            ...this.dataSource.data,
                            nuevoProducto
                        ];
                    });
                this.productoService.getAll().subscribe((productos) => {
                    this.dataSource.data = productos;
                });
            }
        });
    }

    openEditDialog(producto: Producto) {
        const dialogRef = this.dialog.open(ProductosDialogComponent, {
            width: '500px',
            data: {...producto}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productoService
                    .update(producto.id, result)
                    .subscribe(() => {
                        this.productoService.getAll().subscribe((productos) => {
                            this.dataSource.data = productos;
                        });
                    });
            }
        });
    }

    deleteProducto(producto: Producto) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: '¿Confirmar eliminación?',
                message: `¿Estás seguro de eliminar el producto "${producto.nombre}"?`
            } as ConfirmDialogData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.productoService.delete(producto.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (p) => p.id !== producto.id
                    );
                });
            }
        });
    }
}
