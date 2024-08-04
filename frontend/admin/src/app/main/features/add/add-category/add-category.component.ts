import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/main/shared/rest-api/api.service';
FormData

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(private http: ApiService, private router: Router) {}

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  errors: any[] = [];

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('totalproducts', data.totalproducts);

    this.http.create("categories", formData).subscribe({
      next: (data: any) => {
        this.closeDialog();
      },
      error: (error: any) => {
        // this.errors = error["error"]["data"]["errors"];
      }
    })
  }

}
