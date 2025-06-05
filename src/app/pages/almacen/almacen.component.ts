import {Component, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Almacen, AlmacenService} from '@services/almacen.service';

@Component({
    selector: 'app-almacen',
    templateUrl: './almacen.component.html',
    styleUrl: './almacen.component.scss'
})
export class AlmacenComponent {
    displayedColumns: string[] = [
        'fecha_ingreso',
        'stock',
        'producto',
        'unidad',
        'categoria'
    ];
    dataSource = new MatTableDataSource<Almacen>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    private readonly almacenService = inject(AlmacenService);

    ngOnInit() {
        this.almacenService.getAll().subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
