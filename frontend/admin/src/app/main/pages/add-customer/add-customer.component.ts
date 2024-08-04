import { Component } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  
  constructor(private http: ApiService, private router: Router) {}

  image: File | null = null;
  imageSize: number | null = null;
  uploadProgress: number = 0;

  errors: any[] = []

  triggerFileInputClick(): void {
    const upload = document.getElementById('upload') as HTMLInputElement;
    if (upload) {
      upload.click();
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageSize = this.image.size / 1000;
    }
  }

  onSubmit(data: any): void {
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('email', data.email);
    formData.append('password', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append('status', data.status);

    if (this.image) {
      formData.append('avatar', this.image);
    }

    this.http.create("customers", formData).subscribe({
      next: (data: any) => {
        this.router.navigate(['/customers/list'])
        console.log(data)
      },
      error: (error: any) => {
        // this.errors = error["error"]["data"]["errors"];
        console.log(error)
      }
    })

  }

}
