import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/main/shared/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http: ApiService, private router: Router) { }

  faEye = faEye
  faEyeSlash = faEyeSlash

  isShowPassword: boolean = false
  isLoading: boolean = false

  errors: any[] = []

  onShowPassword() {
    this.isShowPassword = !this.isShowPassword
  }

  onSubmit(data: any): void {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500);
    this.http.login(data.email, data.password).subscribe({
      next: (data: any) => {
        this.setNoty("Login Successful", "toast--success", 1500)
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1500);
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
  }

}
