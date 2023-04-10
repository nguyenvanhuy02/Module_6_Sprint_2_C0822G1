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
import {ShareService} from '../../service/security/share.service';
import {Title} from '@angular/platform-browser';

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
  quantityAime: OrderDetail;

  // @ts-ignore
  cart: OrderDetail[];

  totalQuantity = 0;
  quantityCart = 0;

  constructor(private animeService: AnimeService,
              private tokenService: TokenService,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              private shareService: ShareService,
              private toast: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('ShopAnime-Chi Tiết Sản Phẩm')
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.detailByIdAnime(+id);
      }
    });
  }

  ngOnInit(): void {
    this.detailByIdAnime(this.activatedRoute.snapshot.params.id);
    this.getOrder();
  }

  // tslint:disable-next-line:typedef
  detailByIdAnime(id: number) {
    this.animeService.detailAnime(id).subscribe(
      data => {
        this.detailAnime = data;
      }
    );
    this.quantityAime = JSON.parse(this.tokenService.getUser());
    this.orderService.getByAnime(this.quantityAime.id, id).subscribe(
      data => {
        this.quantityAime = data;
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
    // @ts-ignore
    if (quantity > this.detailAnime.quantity) {
      // @ts-ignore
      this.toast.error('Vượt Quá Số Lượng Trong Kho! ');
      return;
    }
    if (this.quantityAime !== null) {
      // @ts-ignore
      if ((quantity + this.quantityAime.quantity) > this.detailAnime.quantity) {
        // @ts-ignore
        this.toast.error('Vượt Quá Số Lượng Trong Kho! '
          + 'Truyện Này Đã Có Trong Giỏ Hàng: ' + this.quantityAime.quantity + ' Quyển.');
        return;
      }
    }
    this.orderService.addOrder(this.orderForm.value).subscribe(data => {
      this.totalQuantity = quantity + this.quantity;
      this.orderService.quantityCount$.next(this.totalQuantity);
      this.toast.success('Đặt hàng thành công');
      // this.getOrder();
      this.clear();
      this.ngOnInit();
    });
    // this.clear();
    // this.getOrder();
    // this.ngOnInit();
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
  minus() {
    if (this.quality > 1) {
      this.quality -= 1;
    }
  }

  // tslint:disable-next-line:typedef
  plus() {
    this.quality += 1;
  }

  // tslint:disable-next-line:typedef
  clear() {
    this.quantity = 0;
  }

}
