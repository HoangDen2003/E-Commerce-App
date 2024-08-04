import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public cartCount$ = new BehaviorSubject<number>(0)
  public activeNav$ = new BehaviorSubject<string>('')

  constructor(private router: Router) {
    this.getCartCount()
    this.getUrl()
  }

  // get cart number from localstorage
  getCartCount() {
    const initialCount = localStorage.getItem('cartCount')
    if (!initialCount) return
    this.cartCount$ = new BehaviorSubject<number>(Number(initialCount));
  }

  // get url
  getUrl() {
    this.activeNav$ = new BehaviorSubject<string>(this.router.url)
  }

  // cart number
  setCartCount(number: number) {
    this.cartCount$.next(number)
    localStorage.setItem('cartCount', String(number))
  }

  increaseCartCount(number: number) {
    this.cartCount$.next(this.cartCount$.value + number)
    localStorage.setItem('cartCount', String(this.cartCount$.value))
  }

  decreaseCartCount(number: number) {
    this.cartCount$.next(this.cartCount$.value - number)
    localStorage.setItem('cartCount', String(this.cartCount$.value))
  }

  // url
  setActive(url: string) {
    this.activeNav$.next(url)
  }

}
