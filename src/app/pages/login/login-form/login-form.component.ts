import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Authenticate } from '../../../models';

@Component({
    selector: 'fwf-login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    @Output() submitted = new EventEmitter<Authenticate>();

    loginForm: FormGroup;
    wasSubmitted = false;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    /**
     * Enable login button for submission.
     * @returns {boolean} Indicator if form is ready for submission.
     */
    get canLogin(): boolean {
        return (!this.wasSubmitted && this.loginForm.invalid && !this.loginForm.touched)
            || (!this.loginForm.invalid && this.loginForm.touched);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit() {
        if (this.loginForm.valid) {
            this.submitted.emit(this.loginForm.value);
        }
    }

}
