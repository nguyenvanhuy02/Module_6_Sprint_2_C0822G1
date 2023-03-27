import {ImgDto} from './imgDto';

export interface AnimeDto {
  id?: number;
  name?: string;
  description?: string;
  price: number;
  dateSubmitted?: string;
  quantity?: number;
  author?: string;
  origin?: string;
  images: ImgDto;
}
