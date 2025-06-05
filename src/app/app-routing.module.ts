import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {ProveedoresComponent} from '@pages/proveedores/proveedores.component';
import {CategoriasComponent} from '@pages/categorias/categorias.component';
import {InsumosComponent} from '@pages/insumos/insumos.component';
import {ProductosComponent} from '@pages/productos/productos.component';
import {ComprasComponent} from '@pages/compras/compras.component';
import {AlmacenComponent} from '@pages/almacen/almacen.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'proveedores',
                component: ProveedoresComponent
            },
            {
                path: 'categorias',
                component: CategoriasComponent
            },
            {
                path: 'insumos',
                component: InsumosComponent
            },
            {
                path: 'productos',
                component: ProductosComponent
            },
            {
                path: 'compras',
                component: ComprasComponent
            },
            {
                path: 'almacen',
                component: AlmacenComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
