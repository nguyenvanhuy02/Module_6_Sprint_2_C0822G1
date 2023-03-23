import {Component, OnInit} from '@angular/core';
import {PageProduct} from '../../model/product/pageProduct';
import {AnimeService} from '../../service/product/anime.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // @ts-ignore
  pageProduct: PageProduct;
  // @ts-ignore
  rfSearch: FormGroup;

  constructor(
    private animeService: AnimeService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.searchProductForm();
    this.findAllProduct(0);
  }

  // tslint:disable-next-line:typedef
  findAllProduct(pageNumber: number) {
    this.animeService.findAllProduct(this.rfSearch.value, pageNumber).subscribe(
      data => {
        console.log(data);
        this.pageProduct = data;
        console.log(data);
      }
    );
  }

  // tslint:disable-next-line:typedef
  searchProductForm() {
    this.rfSearch = this.formBuilder.group({
      name: [''],
      priceMin: [0],
      priceMax: [2000000]
    });
    console.log('search nè ' + this.rfSearch.value);
  }

  // tslint:disable-next-line:typedef
  setSearch(priceMin: number, priceMax: number) {
    this.rfSearch.setValue({
      name: this.rfSearch.value.name,
      priceMin,
      priceMax,
    });
    console.log('maksdoasd' + this.rfSearch.value.name);
    console.log(this.rfSearch.value);
    this.findAllProduct(0);
  }

  // tslint:disable-next-line:typedef
  gotoPage(pageNumber: number) {
    this.findAllProduct(pageNumber);
  }
}
