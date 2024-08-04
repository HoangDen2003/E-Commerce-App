import { Component } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private http: ApiService) { }

  items: any[] = []

  limit: number = 10
  currentPage: number = 1
  pages: number = 0

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.getItems('/products', this.limit, this.currentPage).subscribe({
      next: (data: any) => {
        this.items = data.data.data 
        this.pages = data.data.pages
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

}
