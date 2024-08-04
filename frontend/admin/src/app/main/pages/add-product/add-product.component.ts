import { Component } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  constructor(private http: ApiService, private router: Router) {}

  categories: any[] = [];

  image: File | null = null;
  imageSize: number | null = null;
  uploadProgress: number = 0;

  errors: any[] = []

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(): void {
    this.http.getItems('/categories', 1000, 1).subscribe({
      next: (data: any) => {
        this.categories = data["data"]
      },
      error: (error: Error) => {
        // console.log(error)
      }
    })
  }

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
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('tags', data.tags);
    formData.append('stock', data.stock)
    formData.append('stars', '3')
    formData.append('category', data.category);

    if (this.image) {
      formData.append('image', this.image);
    }

    this.http.create("products", formData).subscribe({
      next: (data: any) => {
        this.router.navigate(['/products/list'])
      },
      error: (error: any) => {
        // this.errors = error["error"]["data"]["errors"];
        console.log(error)
      }
    })

  }

}
