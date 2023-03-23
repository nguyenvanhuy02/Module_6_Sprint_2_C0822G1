package com.example.anime.controller;

import com.example.anime.dto.product.IAnimeHomeDto;
import com.example.anime.dto.product.ProductAnimeDto;
import com.example.anime.model.product.Anime;
import com.example.anime.service.IAnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/anime")
public class AnimeController {

    @Autowired
    private IAnimeService animeService;

    @GetMapping
    public ResponseEntity<List<IAnimeHomeDto>> findAnimeHome(){
        List<IAnimeHomeDto> animeHomeDto = animeService.findAnimeHome();
        if (animeHomeDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(animeHomeDto, HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<Page<IAnimeHomeDto>> findProductAnime(
            @RequestBody ProductAnimeDto productAnimeDto ,
            @PageableDefault(value = 6)Pageable pageable){
        Page<IAnimeHomeDto> animeHomeDtos = animeService.findProductAnime(productAnimeDto, pageable);
        if (animeHomeDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(animeHomeDtos, HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<Anime> deatailAnime(@PathVariable Integer id){
        Anime anime = animeService.findById(id);
        try {
            if (anime == null || anime.isDeleteStatus()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NullPointerException e) {
            e.getStackTrace();
        }
        return new ResponseEntity<>(anime, HttpStatus.OK);
    }
}
