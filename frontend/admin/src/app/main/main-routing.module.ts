import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './main.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users/list', component: UsersComponent },
      { path: 'categories/list', component: CategoriesComponent },
      { path: 'customers/list', component: CustomersComponent },
      { path: 'customers/add', component: AddCustomerComponent },
      { path: 'products/list', component: ProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'orders/list', component: OrdersComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
