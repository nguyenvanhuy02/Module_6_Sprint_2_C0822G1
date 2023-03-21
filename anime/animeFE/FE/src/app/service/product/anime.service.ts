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

  findAllHome(): Observable<any>{
    return this.httpClient.get<any>(environment.api_url);
  }
}
