import {Injectable} from '@angular/core';
import {TokenService} from "../../service/security/token.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.tokenService.getToken()) {
      this.toastr.error('Bạn đã đăng nhập rồi.');
      this.router.navigateByUrl('');
    } else {
      return true;
    }


  }
}
