import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private http: ApiService) { }

  isDelete: boolean = false;
  ids: any[] = [];
  checkedAll: any[] = [];

  items: any[] = []

  limit: number = 10
  currentPage: number = 1
  pages: number = 0

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.getItems('/customers', this.limit, this.currentPage).subscribe({
      next: (data: any) => {
        this.items = data.data.customers
        this.pages = data.data.pages
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

  toggleDelete() {
    this.isDelete = !this.isDelete
    this.loadData()
  }

  onChecked(id: any, event: any): void {
    if (event.target.checked) {
      this.checkedAll.push(id)
    } else {
      const index = this.checkedAll.indexOf(id)
      if (index > -1) {
        this.checkedAll.splice(index, 1)
      }
    }
  }

}
