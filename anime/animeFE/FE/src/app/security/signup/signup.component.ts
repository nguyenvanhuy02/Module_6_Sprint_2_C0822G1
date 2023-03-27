import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // @ts-ignore
  rfAddCustomer: FormGroup;

  constructor(private builder: FormBuilder,
              private toast: ToastrService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createCustomer();
  }

  createCustomer(): void {
    this.rfAddCustomer = this.builder.group({
      name: [],
      phoneNumber: [],
      birthDay: [],
      email: [],
      address: [],
      userName: [],
      password: []
    });
  }

  create(): void {
    if (this.rfAddCustomer?.valid) {
      this.userService.createUser(this.rfAddCustomer?.value).subscribe(
        data => {
          console.log('dữ liệu thêm mới ' + data);
          this.toast.success('Đăng ký thành công');
          this.router.navigateByUrl('/login');
          this.resetFormAndData();
        }
      );
    }
  }

  resetFormAndData(): void {
    this.ngOnInit();
  }
}
