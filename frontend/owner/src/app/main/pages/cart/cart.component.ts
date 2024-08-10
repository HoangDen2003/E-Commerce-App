import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../../features/toast/toast.service';
import { BaseService } from 'src/app/services/base.service';
import { Router } from '@angular/router';

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
  cart: any = {}
  order: any[] = []
  cartCount: number = 0
  user: any = {}

  totalPrice: number = 0

  constructor(private http: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.onLoading()
    this.loadData()
  }

  loadData() {
    this.totalPrice = 0
    const uid = localStorage.getItem('user_id')
    if (uid) {
      this.http.getCart("/carts", uid).subscribe({
        next: (data: any) => {
          this.user = data["data"]["userID"]
          this.items = data["data"]["product"]
          this.cart = data["data"]
          this.items.map(
            (item: any) => {
              this.totalPrice += item["productID"]["price"] * item["quantity"]
          })
        },
        error: (error: Error) => {
          // console.log(error)
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

  onCheckout() {
    const body = {
      uid: localStorage.getItem('user_id'),
      products: this.items,
      price: this.totalPrice,
      address: this.user.address
    }
    this.http.create("orders", body).subscribe({
      next: (data: any) => {
        this.onClearCart()
        localStorage.setItem('order_id', data["data"]["_id"])
        this.router.navigate(['/checkout'])
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

  onClearCart() {
    this.http.deleteCart(this.cart._id).subscribe({
      next: (data: any) => {
        this.loadData()
        this.toastService.show({ template: 'Cleared Success', classname: 'toast--success', delay: 1500 })
        this.decreaseCartCount(0)
      },
      error: (error: Error) => {
        this.toastService.show({ template: 'Cleared Failed', classname: 'toast--error', delay: 1500 })
      },
    })
  }

}
