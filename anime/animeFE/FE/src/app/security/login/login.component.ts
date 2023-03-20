import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../service/security/auth.service";
import {TokenService} from "../../service/security/token.service";
import {MessageRespone} from "../../model/security/message-respone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  rfLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getFormLogin();
  }

  getFormLogin(): void {
    this.rfLogin = this.formBuilder.group({
      userName: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  login(): void {
    // @ts-ignore
    this.authService.login(this.rfLogin.value).subscribe(data => {
      if (data.token !== undefined) {

        // @ts-ignore
        if (this.rfLogin.value.rememberMe) {
          this.tokenService.rememberMe(data.token, data.account, data.roles, data.user);
        } else {
          this.tokenService.setAccountSession(data.account);
          this.tokenService.setTokenSession(data.token);
          this.tokenService.setUserSession(data.user);
          this.tokenService.setRoleSession(data.roles);
        }

        this.router.navigate(['']).then(() => {
          location.reload();
        });

      }
      this.toastr.success('Đăng nhập thành công');

    }, error => {

      const messageRespone: MessageRespone = error;

      if (messageRespone.message) {
        this.toastr.error('Không tìm thấy người dùng');
        this.router.navigateByUrl('/login');
        console.log("Đang Nhập Thát Bại RỒi Nha")
      } else {
        this.toastr.error('Đăng nhập thất bại');
        this.router.navigateByUrl('/login');
        console.log('Đăng nhập thất bại');
      }
    });
  }

}
