import {Component, OnInit} from '@angular/core';
import {PageProduct} from '../../model/product/pageProduct';
import {AnimeService} from '../../service/product/anime.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from '../../service/security/token.service';
import {OrderService} from '../../service/order/order.service';
import {User} from '../../model/user/user';
import {OrderDetail} from '../../model/order/order-detail';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // @ts-ignore
  pageProduct: PageProduct;
  // @ts-ignore
  rfSearch: FormGroup;

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

  constructor(
    private animeService: AnimeService,
    private tokenService: TokenService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getOrder();
    this.searchProductForm();
    this.findAllProduct(0);
  }

  // tslint:disable-next-line:typedef
  findAllProduct(pageNumber: number) {
    this.animeService.findAllProduct(this.rfSearch.value, pageNumber).subscribe(
      data => {
        this.pageProduct = data;
      },
    );
  }

  // tslint:disable-next-line:typedef
  searchProductForm() {
    this.rfSearch = this.formBuilder.group({
      name: [''],
      priceMin: [0],
      priceMax: [2000000]
    });
  }

  // tslint:disable-next-line:typedef
  setSearch(priceMin: number, priceMax: number) {
    this.rfSearch.setValue({
      name: this.rfSearch.value.name,
      priceMin,
      priceMax,
    });
    this.findAllProduct(0);
  }

  // tslint:disable-next-line:typedef
  gotoPage(pageNumber: number) {
    this.findAllProduct(pageNumber);
  }

  // tslint:disable-next-line:typedef
  getFormOrder(anime: any, quantity: number, user: User) {
    this.orderForm = this.formBuilder.group({
      user: [user.id],
      quantity: [quantity],
      anime: [anime]
    });
    console.log(quantity + ' số lượng của nó ');
  }

  // tslint:disable-next-line:typedef
  add(id: any, quantity: number) {
    this.user = JSON.parse(this.tokenService.getUser());
    if (this.user == null) {
      this.toast.error('Bạn cần phải đăng nhập để đặt hàng');
    }
    this.getFormOrder(id, quantity, this.user);
    console.log('số lượng thêm ' + quantity);
    this.orderService.addOrder(this.orderForm.value).subscribe(data => {
      this.totalQuantity = quantity + this.quantity;
      console.log('số lượng nhận' + this.quality);
      this.orderService.quantityCount$.next(this.totalQuantity);
      console.log('tổng số lượng chuyên ' + this.totalQuantity);
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
  clear() {
    this.quantity = 0;
  }
}
