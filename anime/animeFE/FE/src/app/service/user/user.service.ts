import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(environment.userUrl + 'create', user);
  }

  detailUser(id: number | undefined): Observable<any> {
    return this.httpClient.get<any>(environment.userUrl + 'detail/' + id);
  }

  checkEmail(email: string): Observable<any> {
    let dto = {
      email: email
    };
    return this.httpClient.post<any>(environment.userUrl + 'checkUniqueEmail', dto);
  }

  checkUserName(userName: string): Observable<any> {
    let dto = {
      userName: userName
    };
    return this.httpClient.post<any>(environment.userUrl + 'checkUniqueUserName', dto);
  }

  changePassword(obj: any): Observable<any> {
    return this.httpClient.post<any>(environment.userUrl + 'change-password',obj);
  }
}
