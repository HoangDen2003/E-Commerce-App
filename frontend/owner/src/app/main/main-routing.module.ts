import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: 
    [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'shopping-cart', component: CartComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'checkout', component: CheckoutComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
