import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnimeDtoHome} from "../../dto/product/anime-dto-home";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private httpClient: HttpClient) { }

  findAllHome(): Observable<AnimeDtoHome>{
    return this.httpClient.get<AnimeDtoHome>(environment.api_url);
  }
}
