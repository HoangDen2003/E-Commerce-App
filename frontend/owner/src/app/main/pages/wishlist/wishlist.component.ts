import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../../features/toast/toast.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  toastService = inject(ToastService)
  baseService = inject(BaseService)

  isLoading: boolean = true
  items: any = {}
  wishList: any[] = []

  constructor(private http: ApiService) { }

  ngOnInit(): void {
    this.onLoading()
    this.loadData()
  }

  loadData() {
    this.http.getUser().subscribe({
      next: (data: any) => {
        this.wishList = data["data"]["wishlist"]
      }
    })
  }

  onLoading() {
    setTimeout(() => {
      this.isLoading = false
    }, 800);
    this.baseService.setActive('/cart')
  }

  onDeleteProductCart(upd: any) {
    // this.cartCount = 0
    // const uid = localStorage.getItem('user_id')
    // if (!uid) return
    // this.http.deleteProductCart(uid, upd).subscribe({
    //   next: (data: any) => {
    //     this.loadData()
    //     data["data"]["product"].map((item: any) => {
    //       this.cartCount += item["quantity"]
    //     })
    //     this.toastService.show({ template: 'Deleted Success', classname: 'toast--success', delay: 1500 })
    //     this.decreaseCartCount(this.cartCount)
    //   },
    //   error: (error: Error) => {
    //     this.toastService.show({ template: 'Deleted Failed', classname: 'toast--error', delay: 1500 })
    //   },
    // })
  }

  decreaseCartCount(quantity: number) {
    this.baseService.setCartCount(quantity)
  }

}
