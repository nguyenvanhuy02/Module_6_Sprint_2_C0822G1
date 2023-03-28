import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnimeService} from '../../service/product/anime.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../model/user/user';
import {Anime} from '../../model/product/anime';
import {Img} from '../../model/product/img';
import {ImgDto} from '../../dto/product/imgDto';
import {AnimeDto} from '../../dto/product/animeDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  // @ts-ignore
  rfCreateProduct: FormGroup;
  src: string | undefined;
  title = 'cloudsSorage';
  fb: string | undefined;
  downloadURL: Observable<string> | undefined;
  // @ts-ignore
  userFind: User;
  // @ts-ignore
  product: AnimeDto;
  // @ts-ignore
  readFile: any[] | [];
  imgs: any[] = [];
  selectedFile: any[] = [];

  constructor(private storage: AngularFireStorage,
              private animeService: AnimeService,
              private build: FormBuilder,
              private toast: ToastrService,
              private route: Router) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.createProduct();
  }


  createProduct(): void {
    this.rfCreateProduct = this.build.group({
      id: [],
      name: [],
      description: [],
      price: [],
      quantity: [],
      author: [],
      origin: [],
      images: []
    });
  }

  createNewProduct(): void {
    if (this.rfCreateProduct.valid) {
      this.product = this.rfCreateProduct.value;
      console.log(this.rfCreateProduct.value);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.readFile.length; i++) {
        const selectedImage = this.readFile[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(ulr => {
              this.imgs.push(ulr);
            });
          })
        ).subscribe(() => {
        });
      }
      setTimeout(() => {
        this.animeService.createAnime(this.product).subscribe(data => {
          console.log(this.imgs);
          console.log(this.imgs.length);
          if (this.imgs.length !== 0) {
            // tslint:disable-next-line:prefer-for-of no-shadowed-variable
            for (let i = 0; i < this.imgs.length; i++) {
              const image: ImgDto = {
                url: this.imgs[i],
                product: data.id
              };
              this.animeService.createImg(image).subscribe(() => {
              });
            }
          }
          this.toast.success('Thêm Mới Sản Phẩm Thành Công');
          this.route.navigateByUrl('/productManagement');
        });
      }, 10000);
    } else {
      this.toast.error('Thêm Mới Sản Phẩm Thất Bại');
    }
  }

  // function createAbc(){
  //   this.animeService.createAnime(this.product).subscribe(data => {
  //     console.log(this.imgs);
  //     console.log(this.imgs.length);
  //     if (this.imgs.length !== 0) {
  //       // tslint:disable-next-line:prefer-for-of no-shadowed-variable
  //       for (let i = 0; i < this.imgs.length; i++) {
  //         const image: ImgDto = {
  //           url: this.imgs[i],
  //           product: data.id
  //         };
  //         this.animeService.createImg(image).subscribe(() => {
  //         });
  //       }
  //     }
  //     this.toast.success('Thêm Mới Sản Phẩm Thành Công');
  //     // this.route.navigateByUrl('/product');
  //   });
  // }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    const files = event.target.files;
    this.readFile = event.target.files;
    if ((files.length + this.selectedFile.length) < 6) {
      for (const file of files) {
        if (file.size > 1048576) {
          this.toast.error('Dung Lượng Ảnh Vượt Quá 1Mb');
          this.rfCreateProduct.patchValue({images: []});
          this.rfCreateProduct.controls.images.setValue([]);
          break;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFile.push(e.target.result);
          console.log('size' + this.selectedFile);
        };
        reader.readAsDataURL(file);
        console.log('sizezzz' + file);
      }
    } else {
      this.toast.error('Vui Lòng không Chọn Quá 5 ảnh');
      this.rfCreateProduct.patchValue({images: []});
      this.rfCreateProduct.controls.images.setValue([]);
    }
  }

  // tslint:disable-next-line:typedef
  deleteImageNew(index: number) {
    // tslint:disable-next-line:triple-equals
    if (this.selectedFile.length == 1) {
      this.selectedFile.splice(index, 1);
      this.toast.error('Bạn đã xóa 1 ảnh!');
      this.rfCreateProduct.controls.images.setValue([]);
    } else {
      this.selectedFile.splice(index, 1);
      this.toast.error('Bạn đã xóa 1 ảnh!');
    }
  }
}

