import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {CartComponent} from './component/cart/cart.component';
import {ProductComponent} from './component/product/product.component';
import {DetailComponent} from './component/detail/detail.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './security/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {PaymentComponent} from './component/payment/payment.component';
import {SignupComponent} from './security/signup/signup.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { ProductManagementComponent } from './component/product-management/product-management.component';
import { HistoryPaymentComponent } from './component/history-payment/history-payment.component';
import { ProfileComponent } from './component/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProductComponent,
    DetailComponent,
    LoginComponent,
    PaymentComponent,
    SignupComponent,
    CreateProductComponent,
    ProductManagementComponent,
    HistoryPaymentComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
