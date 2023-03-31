import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user/user';
import {UserService} from '../../service/user/user.service';
import {TokenService} from '../../service/security/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @ts-ignore
  detailUser: User;

  constructor(private userService: UserService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.detail();
  }

  // tslint:disable-next-line:typedef
  detail() {
    this.detailUser = JSON.parse(this.tokenService.getUser());
    this.userService.detailUser(this.detailUser.id).subscribe(data => {
      this.detailUser = data;
      console.log('dữ liệ' + data);
    });
  }

}
