package com.example.anime.controller;

import com.example.anime.dto.product.IAnimeHomeDto;
import com.example.anime.service.IAnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
