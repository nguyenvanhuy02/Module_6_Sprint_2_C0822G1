import {OrderAnime} from './order-anime';


export interface Payment {
  id?: number;
  paymentStatus?: number;
  orderAnime?: OrderAnime;
  shippingDescription?: string;
  deleteStatus?: number;
}
