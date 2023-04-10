import {Component, OnInit} from '@angular/core';
import {AnimeService} from '../../service/product/anime.service';
import {FormBuilder} from '@angular/forms';
import {PageHistory} from '../../model/order/pageHistory';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../model/user/user';
import {TokenService} from '../../service/security/token.service';
import {OrderService} from '../../service/order/order.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.css']
})
export class HistoryPaymentComponent implements OnInit {
  // @ts-ignore
  user: User;
  // @ts-ignore
  pageHistory: PageHistory;

  constructor(
    private orderService: OrderService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle('ShopAnime-Lịch Sử Mua Hàng')
  }

  ngOnInit(): void {
    this.getHistory(0);
  }

  // tslint:disable-next-line:typedef
  getHistory(pageNumber: number) {
    this.user = JSON.parse(this.tokenService.getUser());
    this.orderService.historyPayment(this.user.id, pageNumber).subscribe(data => {
      this.pageHistory = data;
    }, error => {
      this.toast.error('Bạn không có lịch sử thanh toán nào cả');
    });
  }

  // tslint:disable-next-line:typedef
  gotoPage(pageNumber: number) {
    this.getHistory(pageNumber);
  }

}
