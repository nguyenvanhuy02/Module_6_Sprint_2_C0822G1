import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnimeDtoHome} from '../../dto/product/anime-dto-home';
import {environment} from '../../../environments/environment';
import {PageProduct} from '../../model/product/pageProduct';
import {Anime} from '../../model/product/anime';

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

  detailAnime(id: number): Observable<Anime>{
    return this.httpClient.get<Anime>(environment.api_url + '/detail/' + id);
  }

}
