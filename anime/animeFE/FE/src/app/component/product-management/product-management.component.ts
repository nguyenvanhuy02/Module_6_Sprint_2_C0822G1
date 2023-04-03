import {Component, OnInit} from '@angular/core';
import {AnimeService} from '../../service/product/anime.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageProduct} from '../../model/product/pageProduct';
import {PageProductManagement} from '../../model/product/pageProductManagement';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
// @ts-ignore
  pageProduct: PageProductManagement;
  // @ts-ignore
  rfSearch: FormGroup;

  constructor(
    private animeService: AnimeService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.searchProductForm();
    this.findAllProduct(0);
  }

  // tslint:disable-next-line:typedef
  findAllProduct(pageNumber: number) {
    this.animeService.findAllProductManagement(this.rfSearch.value, pageNumber).subscribe(
      data => {
        this.pageProduct = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  searchProductForm() {
    this.rfSearch = this.formBuilder.group({
      name: [''],
    });
  }


  // tslint:disable-next-line:typedef
  gotoPage(pageNumber: number) {
    this.findAllProduct(pageNumber);
  }

  delete(id: number, name: string): void {
    Swal.fire({
      title: 'Bạn Có Muốn Xóa?',
      text: 'Quyển Truyện Này: ' + name + ' Không ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animeService.delete(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa Thành Công ',
            showConfirmButton: false,
            timer: 2000
          });
          this.ngOnInit();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
