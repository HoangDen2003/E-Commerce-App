import { Component } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {

  constructor(private http: ApiService) { }

  items: any[] = []

  currentPage: number = 1
  pages: number = 0
  limit: number = 10

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.getItems('/orders', this.limit, this.currentPage).subscribe({
      next: (data: any) => { 
        this.items = data["data"]
        this.pages = data.data.pages
        console.log(this.items)
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

}
