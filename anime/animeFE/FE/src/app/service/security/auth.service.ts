import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoginForm} from '../../model/security/login-form';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private fireAuth: AngularFireAuth,
              private router: Router) {
  }

  // private res: any;

  login(loginForm: LoginForm): Observable<any> {
    return this.httpClient.post<any>(environment.login_url, loginForm);
  }

  // googleAuth(){
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res:any) =>{
  //     this.router.navigate(['dashboard']);
  //   })
  // }

  // tslint:disable-next-line:typedef
  // googleSignIn() {
  //   return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(() => {
  //     // @ts-ignore
  //     this.router.navigate('/login');
  //     localStorage.setItem('token', JSON.stringify(this.res.user?.id));
  //   });
  // }
}
