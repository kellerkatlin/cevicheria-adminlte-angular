import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {environment} from 'environments/environment';
import {ActivityTabComponent} from './pages/profile/activity-tab/activity-tab.component';
import {TimelineTabComponent} from './pages/profile/timeline-tab/timeline-tab.component';
import {SettingsTabComponent} from './pages/profile/settings-tab/settings-tab.component';
import {PostComponent} from './pages/profile/post/post.component';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {SmallBoxComponent} from './components/small-box/small-box.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {LoadingComponent} from './components/loading/loading.component';
import {OverlayLoadingComponent} from './components/overlay-loading/overlay-loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProveedorDialogComponent} from '@components/cevicheria/proveedor-dialog/proveedor-dialog.component';
import {ProveedoresComponent} from '@pages/proveedores/proveedores.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { InsumosComponent } from './pages/insumos/insumos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ConfirmDialogComponent } from './components/cevicheria/confirm-dialog/confirm-dialog.component';
import { CategoriaDialogComponent } from './components/cevicheria/categoria-dialog/categoria-dialog.component';
import { ProductosDialogComponent } from './components/cevicheria/productos-dialog/productos-dialog.component';
import { CompraDialogComponent } from './components/cevicheria/compra-dialog/compra-dialog.component';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        ProveedoresComponent,
        ProveedorDialogComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,

        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        ActivityTabComponent,
        TimelineTabComponent,
        SettingsTabComponent,
        PostComponent,
        InfoBoxComponent,
        SmallBoxComponent,
        ContentHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        ProveedorDialogComponent,
        CategoriasComponent,
        ComprasComponent,
        AlmacenComponent,
        InsumosComponent,
        ProductosComponent,
        ConfirmDialogComponent,
        CategoriaDialogComponent,
        ProductosDialogComponent,
        CompraDialogComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        ProfabricComponentsModule,

        FormsModule,
        MatFormFieldModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync()
    ]
})
export class AppModule {}
