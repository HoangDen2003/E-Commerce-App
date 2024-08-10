import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  baseService = inject(BaseService)

  url: string = ''
  item: any = {}
  isDropdownOpen = false;
  cartCount: number = 0
  wishListCount: number = 0

  constructor(private router: Router, private http: ApiService) {}

  ngOnInit(): void {
    this.url = this.router.url
    this.loadData()
    this.loadCartCount()
    this.loadActiveUrl()
    this.loadWishListCount()
  }

  setActive(url: string) {
    this.url = url
    this.baseService.setActive(url)
  }

  loadData() {
    this.http.getUser().subscribe((data: any) => {
      this.item = data["data"]
    })
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogOut () {
    localStorage.removeItem('user_id')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('cartCount')
    localStorage.removeItem('order_id')
    this.router.navigate(['/auth/login'])
  }

  loadCartCount() {
    this.baseService.cartCount$.subscribe( cc => {
      this.cartCount = cc
    })
  }

  loadWishListCount() {
    this.baseService.wishListCount$.subscribe( wc => {
      this.wishListCount = wc
    })
  }

  loadActiveUrl() {
    this.baseService.activeNav$.subscribe( url => {
      this.url = url
    })
  }

}
