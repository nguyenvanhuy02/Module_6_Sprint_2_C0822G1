import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnimeDtoHome} from '../../dto/product/anime-dto-home';
import {environment} from '../../../environments/environment';
import {PageProduct} from '../../model/product/pageProduct';
import {Anime} from '../../model/product/anime';
import {ImgDto} from '../../dto/product/imgDto';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private httpClient: HttpClient) {
  }

  findAllHome(): Observable<any> {
    return this.httpClient.get<any>(environment.api_url);
  }

  findAllProduct(search: any, pageNumber: number): Observable<any> {
    return this.httpClient.post<any>(environment.api_url + '/product' + '?page=' + pageNumber, search);
  }

  findAllProductManagement(search: any, pageNumber: number): Observable<any> {
    return this.httpClient.post<any>(environment.api_url + '/productManagement' + '?page=' + pageNumber, search);
  }

  detailAnime(id: number): Observable<Anime> {
    return this.httpClient.get<Anime>(environment.api_url + '/detail/' + id);
  }

  createAnime(anime: any): Observable<Anime> {
    return this.httpClient.post<Anime>(environment.api_url + '/create', anime);
  }

  createImg(image: any): Observable<ImgDto> {
    return this.httpClient.post<ImgDto>(environment.api_url + '/img/create', image);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.api_url + '/delete/' + id);
  }

  getListImgProductId(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.api_url + "/img/" + id);
  }

  update(anime: any, id: string): Observable<any> {
    return this.httpClient.put<any>(environment.api_url + '/update/' + id, anime);
  }

  deleteImg(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.api_url + "/img/delete/" + id)
  }
}
