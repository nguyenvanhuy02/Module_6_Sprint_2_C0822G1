import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnimeService} from '../../service/product/anime.service';
import {UserService} from '../../service/user/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {Anime} from '../../model/product/anime';
import {ImgDto} from '../../dto/product/imgDto';
import {finalize} from 'rxjs/operators';
import {User} from '../../model/user/user';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: number | undefined;
  // @ts-ignore
  anime: Anime;
  imgs: ImgDto [] = [];
  // @ts-ignore
  formEditAnime: FormGroup;
  readFile: any[] = [];
  messageEdit = "";
  selectedFile: any[] = [];
  imgCreate: any[] = [];
  // @ts-ignore
  userFind: User;
  idImageList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private animeService: AnimeService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFormEdit();
  }

  getFormEdit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get("id");
      console.log('id nè ' + this.id);
      this.animeService.detailAnime(this.id).subscribe(anime => {
        this.anime = anime;
        this.animeService.getListImgProductId(this.anime.id).subscribe(value => {
          this.imgs = value;
        });
        this.formEditAnime = this.formBuilder.group({
          id: [anime.id],
          name: [anime.name],
          description: [anime.description],
          price: [anime.price],
          quantity: [anime.quantity],
          author: [anime.author],
          origin: [anime.origin],
          images: [1],
        });
      }, error => {
        this.toast.error("Lỗi trang !")
      });
    });
  }

  updateProduct(id: any) {
    if (this.formEditAnime.valid) {
      if (this.readFile.length != 0) {
        for (let i = 0; i < this.readFile.length; i++) {
          let selectedImage = this.readFile[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.messageEdit = ""
                this.imgCreate.push(url);
              });
            })
          ).subscribe(() => {
          });
        }
      }
      setTimeout(() => {
        // this.formEditAnime.patchValue({user: this.userFind.id})
        this.anime = this.formEditAnime.value;
        this.animeService.update(this.anime, id).subscribe(data => {
          if (this.imgCreate.length !== 0) {
            for (let i = 0; i < this.imgCreate.length; i++) {
              const image: ImgDto = {
                url: this.imgCreate[i],
                product: data.id
              };
              this.animeService.createImg(image).subscribe(() => {
              });
            }
          }
          if (this.idImageList.length !== 0) {
            for (let j = 0; j < this.idImageList.length; j++) {
              this.deleteImageById(this.idImageList[j])
            }
          }
          this.toast.success("Cập nhật sản phẩm thành công!");
          this.router.navigateByUrl("/productManagement")
        });
      }, 5000)
    } else {
      this.toast.error("Cập nhật sản phẩm thất bại!");
    }
  }

  deleteImageById(id: number) {
    this.animeService.deleteImg(id).subscribe(data => {
    });
  }

  showPreview(event: any) {
    this.messageEdit = '';
    let files = event.target.files;
    this.readFile = event.target.files;
    if ((files.length + this.imgs.length) < 6) {
      for (let file of files) {
        if (file.size > 1048576) {
          this.messageEdit = 'Dung lượng ảnh vượt quá 1Mb';
          this.selectedFile = [];
          break;
        }
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFile.push(e.target.result);
          console.log(this.selectedFile)
        }
        reader.readAsDataURL(file);
      }
    } else {
      this.toast.error( "Vui lòng không chọn quá 5 ảnh.");
      this.selectedFile = [];
    }
  }

  deleteImage(i: number, img: any) {
    this.idImageList.push(img.id);
    this.imgs.splice(i, 1);
    this.toast.error("Bạn đã xóa 1 ảnh!");
  }

  deleteImageNew(index: number) {
    this.selectedFile.splice(index, 1)
    this.toast.error("Bạn đã xóa 1 ảnh!");
  }

}
