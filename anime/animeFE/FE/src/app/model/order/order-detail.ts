import {OrderAnime} from './order-anime';
import {Anime} from '../product/anime';

export interface OrderDetail {
  id?: number;
  quantity: number;
  anime?: Anime;
  orderAnime?: OrderAnime;
}
