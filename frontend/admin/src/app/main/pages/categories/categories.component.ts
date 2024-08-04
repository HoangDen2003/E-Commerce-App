import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {
  
  constructor(private http: ApiService, private router: Router) {}

  // inject
  categoryService = inject(CategoryService)

  items: any[] = []
  ids: any[] = []
  checkedAll: any[] = []

  currentPage: number = 1
  pages: number = 1
  limit: number = 10

  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteFailed: boolean = false;
  isDeleteSuccess: boolean = false;
  isShowEdit: boolean = false;
  search: string = "";

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.getItems('/categories', this.limit, this.currentPage).subscribe({
      next: (data: any) => {
        this.items = data.data
      },
      error: (error: Error) => {
        // console.log(error)
      },
    })
  }

  // delete category
  onDeleteCategory(item: any) {
    this.ids.push(item._id)
  }

  // Add new user
  toggleShow(): void {
    this.isShow = !this.isShow
    if (this.isShow === false) {
      this.loadData()
    }
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
    this.loadData()
  }

  toggleEdit(): void {
    this.isShowEdit = !this.isShowEdit
  }
  
  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.loadData()
  }

  // onClickDeleteAll(): void {
  //   this.checkBoxs = this.checkBoxsTmp
  // }

  // onPageChange(page: number): void {
  //   this.currentPage = page;
  //   this.loadData();
  // }

  // onSubmitSearch(search: string): void {  
  //   this.search = search
  //   this.loadData()
  // }
    
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
