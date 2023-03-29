import {Img} from './img';

export interface Anime {
  id?: number;
  name: string;
  description?: string;
  price: number;
  dateSubmitted?: string;
  quantity?: number;
  deleteStatus?: number;
  author?: string;
  origin?: string;
  images: Img[];
}
