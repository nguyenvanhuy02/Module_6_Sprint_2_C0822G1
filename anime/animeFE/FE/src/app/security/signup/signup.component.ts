import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';


export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('birthDay').value).getTime();
  console.log(birthday);
  const dateNow = new Date().getTime();
  console.log(dateNow);
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000 || dateNow - birthday > 100 * 365 * 24 * 60 * 60 * 1000) {
    return {checkBirthDay: true};
  } else {
    return null;
  }
};

export const reConfirmPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.touched && password.value !== confirmPassword.value) {
    return {reConfirmPass: true};
  } else {
    return null;
  }
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // @ts-ignore
  rfAddCustomer: FormGroup;

  data1: any = {
    message: 'nousername'
  };
  data2: any = {
    message2: 'noemail'
  };
  data3: any = {
    message: 'yes'
  };

  data4: any = {
    message2: 'ok'
  };

  data5: any = {
    message: 'ok'
  };

  status = '';
  status2 = '';

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
        name: ['', [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$'),
          Validators.maxLength(50),
          Validators.minLength(5)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0][9][0]\\d{7}')]],
        birthDay: ['', [Validators.required]],
        email: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
        address: ['', Validators.required],
        userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
      }, {validators: [checkBirthDay, reConfirmPass]}
    );
  }

  create(): void {
    if (this.rfAddCustomer?.valid) {
      this.userService.createUser(this.rfAddCustomer?.value).subscribe(
        data => {
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data1) && JSON.stringify(data) == JSON.stringify(this.data4) ) {
            this.status = ' Tài Khoản Đã Tồn Tại';
            console.log('tài khoản');
          }
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data2) && JSON.stringify(data) == JSON.stringify(this.data5)) {
            this.status2 = ' Email Đã Tồn Tại';
            console.log('email');
          }
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data4) && JSON.stringify(data) == JSON.stringify(this.data5) ) {
            this.status = 'Đăng Ký Thành Công';
            this.toast.success('Đăng ký thành công');
            this.router.navigateByUrl('/login');
            this.resetFormAndData();
          }
        }
      );
    }
  }

  resetFormAndData(): void {
    this.ngOnInit();
  }
}
