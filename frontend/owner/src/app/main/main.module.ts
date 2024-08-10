import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SlideComponent } from './features/slide/slide.component';
import { ProductComponent } from './features/product/product.component';
import { BlogComponent } from './features/blog/blog.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PaginationComponent } from './features/pagination/pagination.component';
import { StarRatingComponent } from './features/star-rating/star-rating.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailsComponent,
    SlideComponent,
    CartComponent,
    ShopComponent,
    WishlistComponent,
    MyProfileComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BlogComponent,
    ProductComponent,
    StarRatingComponent,
    PaginationComponent,
    FontAwesomeModule
  ]
})
export class MainModule { }
