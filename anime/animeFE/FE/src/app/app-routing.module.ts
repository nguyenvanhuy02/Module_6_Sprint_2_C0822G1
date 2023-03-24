import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {ProductComponent} from "./component/product/product.component";
import {CartComponent} from "./component/cart/cart.component";
import {DetailComponent} from "./component/detail/detail.component";
import {LoginComponent} from "./security/login/login.component";
import {UserService} from './security/guard/user.service';
import {PaymentComponent} from './component/payment/payment.component';
import {SignupComponent} from './security/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'cart', component: CartComponent , canActivate: [UserService]},
  {path: 'payment', component: PaymentComponent, canActivate: [UserService]},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
