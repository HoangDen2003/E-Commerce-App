import { Component, inject, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ApiService } from '../../shared/api/api.service';
import { ToastService } from '../toast/toast.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  toastService = inject(ToastService)
  baseService = inject(BaseService)
  
  @Input() item: any = {}
  cartCount: number = 0
  
  constructor(private http: ApiService) { }
  
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

}
