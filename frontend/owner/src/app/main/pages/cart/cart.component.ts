import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../../features/toast/toast.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  toastService = inject(ToastService)
  baseService = inject(BaseService)

  isLoading: boolean = true
  items: any = {}
  cartCount: number = 0

  constructor(private http: ApiService) { }

  ngOnInit(): void {
    this.onLoading()
    this.loadData()
  }

  loadData() {
    const uid = localStorage.getItem('user_id')
    if (uid) {
      this.http.getCart("/carts", uid).subscribe({
        next: (data: any) => {
          this.items = data["data"]["product"]
        },
        error: (error: Error) => {
          console.log(error)
        },
      })
    }
  }

  onLoading() {
    setTimeout(() => {
      this.isLoading = false
    }, 800);
    this.baseService.setActive('/cart')
  }

  onDeleteProductCart(upd: any) {
    this.cartCount = 0
    const uid = localStorage.getItem('user_id')
    if (!uid) return
    this.http.deleteProductCart(uid, upd).subscribe({
      next: (data: any) => {
        this.loadData()
        data["data"]["product"].map((item: any) => {
          this.cartCount += item["quantity"]
        })
        this.toastService.show({ template: 'Deleted Success', classname: 'toast--success', delay: 1500 })
        this.decreaseCartCount(this.cartCount)
      },
      error: (error: Error) => {
        this.toastService.show({ template: 'Deleted Failed', classname: 'toast--error', delay: 1500 })
      },
    })
  }

  decreaseCartCount(quantity: number) {
    this.baseService.setCartCount(quantity)
  }

}
