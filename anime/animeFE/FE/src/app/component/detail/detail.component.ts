import {Component, OnInit} from '@angular/core';
import {Anime} from '../../model/product/anime';
import {AnimeService} from '../../service/product/anime.service';
import {TokenService} from '../../service/security/token.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../model/user/user';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../service/order/order.service';
import {OrderDetail} from '../../model/order/order-detail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  // @ts-ignore
  id: number;
  // @ts-ignore
  detailAnime: Anime;
  // @ts-ignore
  user: User;
  // @ts-ignore
  orderForm: FormGroup;
  urlShow: string | undefined;
  quality = 1;
  quantity = 0;

  // @ts-ignore
  currentUser: User;

  // @ts-ignore
  cart: OrderDetail[];

  totalQuantity = 0;

  constructor(private animeService: AnimeService,
              private tokenService: TokenService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.detailByIdAnime(+id);
      }
    });
  }

  ngOnInit(): void {
    this.getOrder();
    this.detailByIdAnime(this.activatedRoute.snapshot.params.id);
  }

  // tslint:disable-next-line:typedef
  detailByIdAnime(id: number) {
    this.animeService.detailAnime(id).subscribe(
      data => {
        this.detailAnime = data;
        // @ts-ignore
        this.urlShow = this.clothesDetail.images[0].url;
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
  // add(id: any, quantity: number) {
  //   this.user = JSON.parse(this.tokenService.getUser());
  //   if (this.user == null) {
  //     this.toast.error('Bạn cần phải đăng nhập để đặt hàng');
  //   }
  //   this.getFormOrder(id, quantity, this.user);
  //   console.log('số lượng thêm ' + quantity);
  //   this.orderService.addOrder(this.orderForm.value).subscribe(data => {
  //     this.totalQuantity = quantity + this.quantity;
  //     this.orderService.quantityCount$.next(this.totalQuantity);
  //     console.log('tổng số lượng chuyên ' + this.totalQuantity);
  //     this.toast.success('Đặt hàng thành công');
  //   });
  // }
  // tslint:disable-next-line:typedef
  add(id: any) {
    this.user = JSON.parse(this.tokenService.getUser());
    if (this.user == null) {
      this.toast.error('Bạn cần phải đăng nhập để đặt hàng');
    }
    this.getFormOrder(id, this.quality, this.user);
    console.log('số lượng thêm ' + this.quality);
    this.orderService.addOrder(this.orderForm.value).subscribe(data => {
      this.totalQuantity = this.quality + this.quantity;
      this.orderService.quantityCount$.next(this.totalQuantity);
      console.log('tổng số lượng chuyên ' + this.totalQuantity);
      this.toast.success('Đặt hàng thành công');
    });
  }

  // tslint:disable-next-line:typedef
  getOrder() {
    this.currentUser = JSON.parse(this.tokenService.getUser());
    this.orderService.getCart(this.currentUser.id).subscribe(data => {
      this.cart = data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.quantity = this.quantity + this.cart[i].quantity;
      }
      console.log('số lượng detail' + this.quantity);
    });
  }


  // tslint:disable-next-line:typedef
  minus() {
    if (this.quality > 1) {
      this.quality -= 1;
    }
  }

  // tslint:disable-next-line:typedef
  plus() {
    this.quality += 1;
  }

}
