import {Component, OnInit} from '@angular/core';
import {AnimeService} from '../../service/product/anime.service';
import {AnimeDtoHome} from '../../dto/product/anime-dto-home';
import {TokenService} from '../../service/security/token.service';
import {User} from '../../model/user/user';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../../service/order/order.service';
import {Anime} from '../../model/product/anime';
import {OrderDetail} from '../../model/order/order-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listAnime: AnimeDtoHome[] = [];

  // @ts-ignore
  user: User;

  quality = 1;

  // @ts-ignore
  cart: OrderDetail[];

  // @ts-ignore
  orderForm: FormGroup;

  totalQuantity = 0;
  quantity = 0;

  // @ts-ignore
  currentUser: User;

  // @ts-ignore
  quantityAime: OrderDetail;

  // @ts-ignore
  detailAnime: Anime;

  constructor(private animeService: AnimeService,
              private tokenService: TokenService,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.animeService.findAllHome().subscribe(
      data => {
        this.listAnime = data;
        this.getOrder();
      }
    );
  }

  // tslint:disable-next-line:typedef
  getFormOrder(anime: any, quantity: number, user: User) {
    this.orderForm = this.formBuilder.group({
      user: [user.id],
      quantity: [quantity],
      anime: [anime]
    });
  }

  // tslint:disable-next-line:typedef
  add(id: any, quantity: number) {
    this.user = JSON.parse(this.tokenService.getUser());
    if (this.user == null) {
      this.toast.error('Bạn cần phải đăng nhập để đặt hàng');
    }
    this.getFormOrder(id, quantity, this.user);
    this.orderService.addOrder(this.orderForm.value).subscribe(data => {
      this.totalQuantity = quantity + this.quantity;
      this.orderService.quantityCount$.next(this.totalQuantity);
      this.toast.success('Đặt hàng thành công');
    });
    this.clear();
    this.getOrder();
  }

  // tslint:disable-next-line:typedef
  getOrder() {
    this.currentUser = JSON.parse(this.tokenService.getUser());
    this.orderService.getCart(this.currentUser.id).subscribe(data => {
      this.cart = data;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.quantity = this.quantity + this.cart[i].quantity;
      }
    });
  }

  // tslint:disable-next-line:typedef
  clear() {
    this.quantity = 0;
  }

}
