import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {User} from 'firebase/auth';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user?: User;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Proveedores',
        iconClasses: 'fas fa-building',
        path: ['/proveedores']
    },
    {
        name: 'Categorías',
        iconClasses: 'fas fa-th-list',
        path: ['/categorias']
    },
    {
        name: 'Productos',
        iconClasses: 'fas fa-box',
        path: ['/productos']
    },
    {
        name: 'Compras',
        iconClasses: 'fas fa-shopping-cart',
        path: ['/compras']
    },

    {
        name: 'Insumos',
        iconClasses: 'fas fa-boxes',
        path: ['/insumos']
    },
    {
        name: 'Almacen',
        iconClasses: 'fas fa-warehouse',
        path: ['/almacen']
    }
    // {
    //     name: 'Main Menu',
    //     iconClasses: 'fas fa-folder',
    //     children: [
    //         {
    //             name: 'Sub Menu',
    //             iconClasses: 'far fa-address-book',
    //             path: ['/sub-menu-1']
    //         },
    //         {
    //             name: 'Blank',
    //             iconClasses: 'fas fa-file',
    //             path: ['/sub-menu-2']
    //         }
    //     ]
    // }
];
