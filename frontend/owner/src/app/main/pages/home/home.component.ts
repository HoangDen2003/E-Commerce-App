import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../../features/toast/toast.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {  

  toastService = inject(ToastService)
  baserService = inject(BaseService)

  constructor(private http: ApiService) {}

  limit: number = 100
  currentPage: number = 1
  tag: string = ''
    
  isloading: boolean = true
  items: any[] = []
  cartCount: number = 0

  ngOnInit(): void {
    this.onLoading()
    this.loadProducts()
    this.loadToasts()
    this.loadCartCount()
  }

  loadProducts() {
    this.http.getData("/products", 4, this.currentPage, this.tag).subscribe({
      next: (data: any) => {
        this.items = data["data"]["data"].slice()
        console.log(this.items)
      }
    })
  }

  onLoading() {
    setTimeout(() => {
      this.isloading = false
    }, 800);
    this.baserService.setActive('/home')
  }

  loadToasts() {
    const templateUrl = localStorage.getItem('template')
    const classname = localStorage.getItem('classname')
    const delay = localStorage.getItem('delay')
    if (!templateUrl || !classname || !delay) return
    this.toastService.show({template: templateUrl, classname: classname, delay: Number(delay)})
    localStorage.removeItem('template')
    localStorage.removeItem('classname')
    localStorage.removeItem('delay')
  }

  loadCartCount() {
    const uid = localStorage.getItem('user_id')
    if (!uid) return
    this.http.getCart("/carts", uid).subscribe({
      next: (data: any) => {
        data["data"]["product"].map((item: any) => {
          this.cartCount += item["quantity"]
        })
        // this.baserService.setCartCount(this.cartCount)
        localStorage.setItem('cartCount', String(this.cartCount))
      }
    })
  }

  onSetTags(tag: string) {
    this.tag = tag
    this.loadProducts()
  }

}
