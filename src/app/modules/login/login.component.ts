import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';

    public loginForm: FormGroup;

    constructor(
        private renderer: Renderer2,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }

    submit() {
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;
            if (email === 'admin@admin.com' && password === 'admin123') {
                this.router.navigate(['/']);
                // Aquí puedes redirigir o mostrar mensaje de éxito
            } else {
                console.log('Credenciales incorrectas');
                // Aquí puedes mostrar un mensaje de error en la UI
            }
        }
    }
}
