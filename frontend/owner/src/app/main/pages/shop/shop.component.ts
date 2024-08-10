import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  baseService = inject(BaseService)

  constructor(private http: ApiService) { }

  isOpen: boolean = false;
  isShow: boolean = false;
  isloading: boolean = true;
  dataValue: number = 1

  items: any[] = []
  categories: any[] = []
  category: string = ''
  wishList: any[] = []
  fillTer: any[] = []


  currentPage: number = 1
  pages: number = 1
  limit: number = 9
  tag: string = ''

  stringValue: string[] = [
    'Low To High',
    '$0 - $55',
    '$55 - $100'
  ]

  ngOnInit(): void {
    this.onLoading()
    this.loadProduct()
    this.loadCategory()
  }

  onLoading() {
    setTimeout(() => {
      this.isloading = false
    }, 800);
    this.baseService.setActive('/shop')
  }

  loadProduct() {
    this.http.getData("/products", this.limit, this.currentPage, this.tag, this.category).subscribe({
      next: (data: any) => {
        this.items = data["data"]["data"].slice()
        this.pages = data["data"]["pages"]
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  loadCategory() {
    this.http.getData('/categories', this.limit, this.currentPage, "", "").subscribe({
      next: (data: any) => {
        this.categories = data["data"].slice()
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

  onShow() {
    this.isOpen = !this.isOpen
  }

  onSelect(number: number) {
    this.dataValue = number
  }

  onCollapse(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const data = target.getAttribute('data-target');
    if (data) {
      const content = document.querySelector(data);
      if (content) {
        content.classList.toggle('show');
        content.classList.toggle('collapsed');
      }
    }
  }

  onPageChange(page: number): void {
    console.log(page)
    this.currentPage = page;
    this.loadProduct();
  }

  onFillter(category: any) {
    const __CID = category
    this.category = __CID
    this.loadProduct()
  }

  onFillterTags(tag: any) {
    this.tag = tag
    this.loadProduct()
  }

}
