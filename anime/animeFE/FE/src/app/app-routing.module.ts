import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ProductComponent} from './component/product/product.component';
import {CartComponent} from './component/cart/cart.component';
import {DetailComponent} from './component/detail/detail.component';
import {LoginComponent} from './security/login/login.component';
import {UserService} from './security/guard/user.service';
import {PaymentComponent} from './component/payment/payment.component';
import {SignupComponent} from './security/signup/signup.component';
import {CreateProductComponent} from './component/create-product/create-product.component';
import {ProductManagementComponent} from './component/product-management/product-management.component';
import {AdminService} from './security/guard/admin.service';
import {HistoryPaymentComponent} from './component/history-payment/history-payment.component';
import {ProfileComponent} from './component/profile/profile.component';
import {EditProductComponent} from './component/edit-product/edit-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'cart', component: CartComponent, canActivate: [UserService]},
  {path: 'payment', component: PaymentComponent, canActivate: [UserService]},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'history', component: HistoryPaymentComponent, canActivate: [UserService]},
  {path: 'createProduct', component: CreateProductComponent , canActivate: [AdminService]},
  {path: 'editProduct/:id', component: EditProductComponent , canActivate: [AdminService]},
  {path: 'productManagement', component: ProductManagementComponent , canActivate: [AdminService]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
