import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { PaginateComponent } from './features/paginate/paginate.component';
import { AddCategoryComponent } from './features/add/add-category/add-category.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './features/delete/delete.component';


@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    HomeComponent,
    SidebarComponent,
    CustomersComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    AddProductComponent,
    PaginateComponent,
    AddCategoryComponent,
    AddCustomerComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    DeleteComponent,
  ]
})
export class MainModule { }
