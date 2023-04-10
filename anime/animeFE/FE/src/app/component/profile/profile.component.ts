import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user/user';
import {UserService} from '../../service/user/user.service';
import {TokenService} from '../../service/security/token.service';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Account} from '../../model/user/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @ts-ignore
  detailUser: User;
// @ts-ignore
  rfPassword: FormGroup;
  // @ts-ignore
  account: Account;


  constructor(private userService: UserService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('ShopAnime-Thông Tin Cá Nhân')
  }

  ngOnInit(): void {
    this.detail();
    this.getFormLogin();
  }

  // tslint:disable-next-line:typedef
  detail() {
    this.detailUser = JSON.parse(this.tokenService.getUser());
    this.userService.detailUser(this.detailUser.id).subscribe(data => {
      this.detailUser = data;
    });
  }

  getFormLogin(): void {
    this.account = JSON.parse(this.tokenService.getAccount())
    this.rfPassword = this.formBuilder.group({
      confirmPassword: [''],
      password: [''],
      newPassword: [''],
      userName: [this.account.userName]
    });
  }
  passwordError = '';
  newPasswordError = '';
  confirmPasswordError = '';
  op: boolean | undefined;
  np: boolean | undefined;
  cp: boolean | undefined;
  changePassword() {
    this.passwordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';
    this.userService.changePassword(this.rfPassword.value).subscribe(
      next => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Chúc mừng đã cập nhật mật khẩu thành công',
          showConfirmButton: false,
          timer: 2500
        })
        // @ts-ignore
        document.getElementById('dismiss2').click()
        this.getFormLogin();
      }, error => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Thay đổi mật khẩu thất bại',
          showConfirmButton: false,
          timer: 2500
        })
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'password') {
            this.passwordError = error.error[i].defaultMessage;
          } else if (error.error[i].field == 'newPassword') {
            this.newPasswordError = error.error[i].defaultMessage;
          } else if (error.error[i].field == 'confirmPassword') {
            this.confirmPasswordError = error.error[i].defaultMessage;
          }
        }
      }
    )
  }

  oldPassword() {
    this.op = !this.op;

  }

  newPassword() {
    this.np = !this.np;

  }

  confirmPassword() {
    this.cp = !this.cp;

  }

}
