import { Component, inject } from '@angular/core';
import { faClock, faLocationDot, faWallet, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../features/toast/toast.service';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  faClock = faClock
  faLocationDot = faLocationDot
  faWallet = faWallet
  faTruckFast = faTruckFast

  toastService = inject(ToastService)
  
  isLoading: boolean = true
  email: string = ''
  products: any[] = []
  total: number = 0
  user: any = {}
  order: any = {}

  constructor(private http: ApiService) { }

  ngOnInit(): void {
    this.onLoading()
    this.loadData()
  }

  onLoading() {
    setTimeout(() => {
      this.isLoading = false
    }, 800);
    // this.baseService.setActive('/cart')
    setTimeout(() => {
      this.toastService.show({ template: 'Successful', classname: 'toast--success', delay: 2000 })
    }, 500);
  }

  loadData() { 
    this.http.getOrder().subscribe(
      {
        next: (data: any) => {
          this.user = data["data"]["uid"]
          this.order = data["data"]
          console.log(this.user)
          this.products = data["data"]["products"]
          this.products.map((product: any) => {
            this.total += (product.quantity * product.productID.price)
          })
        }, 
        error: (error: Error) => {console.log(error)}
      }
    )
  }

}
