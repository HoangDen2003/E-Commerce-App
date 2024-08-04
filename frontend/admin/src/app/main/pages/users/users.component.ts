import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: ApiService, private router: Router) { }

  users: any[] = []

  // paginate
  limit: number = 10
  currentPage: number = 1
  pages: number = 1
  
  ngOnInit(): void {
    this.loadData()
  }

  // reload data
  loadData() {
    this.http.getItems("/users", this.limit, this.currentPage).subscribe({
      next: (data: any) => {
        this.users = data.data.items
        this.pages = data.data.pages
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

}
