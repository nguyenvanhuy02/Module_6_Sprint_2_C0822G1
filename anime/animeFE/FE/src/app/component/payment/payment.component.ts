import { Component, OnInit } from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {TokenService} from '../../service/security/token.service';
import {OrderService} from '../../service/order/order.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {OrderDetail} from '../../model/order/order-detail';
import {User} from '../../model/user/user';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
// @ts-ignore
  user: User;
  // @ts-ignore
  money: number;
  totalPrice = 0;
  // @ts-ignore
  cart: OrderDetail[];
  checkPaypal = true;

  constructor(private tokenService: TokenService,
              private orderService: OrderService,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPayMent();
  }

  // tslint:disable-next-line:typedef
  getPayMent() {
    this.user = JSON.parse(this.tokenService.getUser());
    this.orderService.getCart(this.user.id).subscribe(data => {
      this.cart = data;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalPrice = this.totalPrice + this.cart[i].quantity * parseInt(this.cart[i].anime.price);
      }
      this.money = +(this.totalPrice / 23000).toFixed(2);
      if (this.checkPaypal) {
        this.paypal();
        this.checkPaypal = false;
      }
    });
  }

  // tslint:disable-next-line:typedef
  paypal() {
    render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: String(this.money),
        onApprove: (details) => {
          // @ts-ignore
          const note: string = document.getElementById('note').value;
          this.orderService.payment(this.user.id, note).subscribe(data => {
            this.toast.success('Thanh toán thành công');
            this.router.navigateByUrl('');
          });
        }
      }
    );
  }

}
