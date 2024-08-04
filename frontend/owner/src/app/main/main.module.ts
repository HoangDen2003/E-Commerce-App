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
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BlogComponent,
    ProductComponent,
    StarRatingComponent,
    PaginationComponent,
  ]
})
export class MainModule { }
