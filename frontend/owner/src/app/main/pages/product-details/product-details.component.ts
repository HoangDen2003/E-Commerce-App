import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  constructor(private http: ApiService) { }

  _PID: string = ''
  product: any = {}
  isloading: boolean = true

  ngOnInit(): void {
    this.onLoading()
    this.loadProduct()
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
  
}
