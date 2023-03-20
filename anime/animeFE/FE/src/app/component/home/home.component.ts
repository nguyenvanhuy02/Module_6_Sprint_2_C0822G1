import {Component, OnInit} from '@angular/core';
import {AnimeService} from "../../service/product/anime.service";
import {AnimeDtoHome} from "../../dto/product/anime-dto-home";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ts-ignore
  listAnime: AnimeDtoHome = [];

  constructor(private animeService: AnimeService) {
  }

  ngOnInit(): void {
    this.animeService.findAllHome().subscribe(
      data => {
        console.log(data);
        this.listAnime = data;
      }
    );
  }

}
