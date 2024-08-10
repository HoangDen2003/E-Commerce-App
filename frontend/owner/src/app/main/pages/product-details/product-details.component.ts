import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../../features/toast/toast.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  toastService = inject(ToastService)
  baseService = inject(BaseService)

  constructor(private http: ApiService) { }

  _PID: string = ''
  product: any = {}
  isloading: boolean = true

  wishList: any[] = []
  isWishList: boolean = false

  ngOnInit(): void {
    this.onLoading()
    this.loadProduct()
    this.loadWishList()
  }

  loadProduct() {
    const pid = localStorage.getItem('_PID')
    if (pid) {
      this._PID = pid
    }
    this.http.getProduct(this._PID).subscribe({
      next: (data: any) => {
        this.product = data["data"]
      },
      error: (error) => {
        // console.log(error)
      }
    })
  }

  onLoading() {
    setTimeout(() => {
      this.isloading = false
    }, 800);
  }

  onAddWishList(item: any) {
    const uid = localStorage.getItem('user_id')
    const pid = item._id
    this.http.addWishList(uid, pid).subscribe({
      next: (data: any) => {
        this.toastService.show({ template: data["data"]["msg"], classname: 'toast--success', delay: 1500 })
        this.loadWishList()
        this.checkWishList()
      }, error: (error: any) => {
        this.toastService.show({ template: 'Added WishList Failed', classname: 'toast--error', delay: 1500 })
      }
    })
  }
  
  loadWishList() {
    this.http.getUser().subscribe((data: any) => {
      this.wishList = data["data"]["wishlist"].slice()
      this.isWishList = this.wishList.some((item: any) => item._id === this.product._id);
    })
  }

  checkWishList() {
    this.isWishList = this.wishList.some((item: any) => item._id === this.product._id);
    if (!this.isWishList) {
      this.increaseWishListCount(1)
    } else {
      this.decreaseWishListCount(1)
    }
  }

  increaseWishListCount(number: number) {
    this.baseService.increaseWishListCount(number)
  }

  decreaseWishListCount(number: number) {
    this.baseService.decreaseWishListCount(number)
  }

  onAddToCart(item: any) {
    const quanlity = document.getElementById('quantity') as HTMLInputElement
    const pid = item._id
    const uid = localStorage.getItem('user_id')
    const body = {
      userID: uid, 
      productID: pid, 
      quantity: Number(quanlity.value)
    }
    this.http.create("carts", body).subscribe({
      next: (data: any) => {
        this.increaseCartCount(body.quantity)
        this.toastService.show({ template: 'Added Success', classname: 'toast--success', delay: 1500 })
      }, error: (error: any) => {
        this.toastService.show({ template: 'Added Failed', classname: 'toast--error', delay: 1500 })
      }
    })
  }

  increaseCartCount(number: number) {
    this.baseService.increaseCartCount(number)
  }

}
