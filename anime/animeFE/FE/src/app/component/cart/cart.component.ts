import {Component, OnInit} from '@angular/core';
import {OrderDetail} from '../../model/order/order-detail';
import {User} from '../../model/user/user';
import {TokenService} from '../../service/security/token.service';
import {OrderService} from '../../service/order/order.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Anime} from '../../model/product/anime';
import {AnimeService} from '../../service/product/anime.service';
import {ShareService} from '../../service/security/share.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // @ts-ignore
  cart: OrderDetail[];
  // @ts-ignore
  user: User;
  totalPrice = 0;
  totalQuantity = 0;
  // @ts-ignore
  money: number;
  // @ts-ignore
  animeQuanlity: Anime;

  constructor(
    private animeService: AnimeService,
    private tokenService: TokenService,
    private orderService: OrderService,
    private toast: ToastrService,
    private shareService: ShareService,
    private titleService: Title
  ) {
    this.titleService.setTitle('ShopAnime-Giỏ Hàng')
  }

  ngOnInit(): void {
    this.getOrder();
  }

  // tslint:disable-next-line:typedef
  getOrder() {
    this.user = JSON.parse(this.tokenService.getUser());
    this.orderService.getCart(this.user.id).subscribe(data => {
      this.cart = data;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalPrice = this.totalPrice + this.cart[i].quantity * parseInt(this.cart[i].anime.price);
      }
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalQuantity = this.totalQuantity + this.cart[i].quantity;
      }
      this.orderService.quantityCount$.next(this.totalQuantity);
    }, error => {
      this.toast.error('Không có sản phẩm nào trong giỏ hàng');
      this.clear();
    });
  }

  // tslint:disable-next-line:typedef
  total() {
    if (this.cart) {
      this.totalPrice = 0;
      this.totalQuantity = 0;
      this.cart.forEach(value => {
        // @ts-ignore
        this.totalPrice += value.quantity * value.anime.price;
        // @ts-ignore
        this.totalQuantity += value.quantity;
      });
    } else {
      this.totalPrice = 0;
    }
    this.orderService.quantityCount$.next(this.totalQuantity);
  }

  // tslint:disable-next-line:typedef
  minus(id: number | any) {
    // tslint:disable-next-line:prefer-const
    // @ts-ignore
    const quantity = +document.getElementById('quantity' + id).innerHTML;
    if (quantity !== 1) {
      this.orderService.minus(id).subscribe(data => {
        this.totalPrice = 0;
        this.cart.forEach(value => {
          if (value.id === data.id) {
            value.quantity = data.quantity;
          }
        });
        this.total();
        // @ts-ignore
        this.money = +(this.totalPrice / 23000).toFixed(2);
      });
    }
  }

  // tslint:disable-next-line:typedef
  plus(id: number | any) {
    this.orderService.plus(id).subscribe(data => {
      this.totalPrice = 0;
      this.cart.forEach(value => {
        if (value.id === data.id) {
          value.quantity = data.quantity;
        }
      });
      if (data.quantity > data.anime.quantity) {
        this.toast.error('Hiện Tại Số Lượn Trong Kho Chỉ Còn: ' + data.anime.quantity);
        this.minus(id);
      }
      this.total();
      // @ts-ignore
      this.money = +(this.totalPrice / 23000).toFixed(2);
    });
  }

  // tslint:disable-next-line:typedef
  clear() {
    this.cart = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  delete(id: number, name: string): void {
    Swal.fire({
      title: 'Bạn Có Muốn Xóa?',
      text: 'Quyển Truyện Này: ' + name + ' Không ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.delete(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa Thành Công ',
            showConfirmButton: false,
            timer: 2000
          });
          this.getOrder();
          this.clear();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
