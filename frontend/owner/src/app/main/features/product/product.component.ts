import { Component, inject, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../toast/toast.service';
import { BaseService } from 'src/app/services/base.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// icon
import { faArrowRightArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StarRatingComponent, FontAwesomeModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  toastService = inject(ToastService)
  baseService = inject(BaseService)
  
  @Input() item: any = {}
  cartCount: number = 0
  wishList: any[] = []
  isWishList: boolean = false

  // icon
  faArrowRightArrowLeft = faArrowRightArrowLeft
  faSearch = faSearch
  
  constructor(private http: ApiService) { }

  ngOnInit(): void {
    this.loadWishList()
  }
  
  onSetPID(pid: string) {
    localStorage.setItem('_PID', pid)
  }

  onAddToCart(item: any) {
    const pid = item._id
    const uid = localStorage.getItem('user_id')
    const body = {
      userID: uid, 
      productID: pid, 
      quantity: 1
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

  increaseWishListCount(number: number) {
    this.baseService.increaseWishListCount(number)
  }

  decreaseWishListCount(number: number) {
    this.baseService.decreaseWishListCount(number)
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
      this.isWishList = this.wishList.some((item: any) => item._id === this.item._id);
    })
  }

  checkWishList() {
    this.isWishList = this.wishList.some((item: any) => item._id === this.item._id);
    if (!this.isWishList) {
      this.increaseWishListCount(1)
    } else {
      this.decreaseWishListCount(1)
    }
  }

}
