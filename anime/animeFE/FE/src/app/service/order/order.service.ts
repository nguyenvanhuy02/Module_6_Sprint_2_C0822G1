import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public quantityCount$ = new BehaviorSubject<number>(0);


  constructor(private httpClient: HttpClient) {
  }

  getCart(id: number | undefined): Observable<any> {
    return this.httpClient.get<any>(environment.orderUrl + 'cart/' + id);
  }

  addOrder(orderForm: any): Observable<any> {
    return this.httpClient.post<any>(environment.orderUrl + 'addOrder', orderForm);
  }

  minus(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.orderUrl + 'minus/' + id);
  }

  plus(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.orderUrl + 'plus/' + id);
  }

  payment(id: number | undefined, note: string): Observable<any> {
    return this.httpClient.get<any>(environment.orderUrl + 'payment/' + id + '?note=' + note);
  }
}

