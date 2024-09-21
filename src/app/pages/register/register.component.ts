import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);

  public registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    employeecode: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  onSubmit = () => {
    if (this.registerForm.valid) {
      console.log('register data', this.registerForm.value)

      // TODO: navigate to homepage
    }
  }
}
