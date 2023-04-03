package com.example.anime.service;

import com.example.anime.dto.product.AnimeManagement;
import com.example.anime.dto.product.IAnimeHomeDto;
import com.example.anime.dto.product.IAnimeManagement;
import com.example.anime.dto.product.ProductAnimeDto;
import com.example.anime.model.product.Anime;
import com.example.anime.model.product.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IAnimeService {
    List<IAnimeHomeDto> findAnimeHome();

    Page<IAnimeHomeDto> findProductAnime(ProductAnimeDto animeDto, Pageable pageable);

    Page<IAnimeManagement> findAnimeManagement(AnimeManagement animeManagement, Pageable pageable);

    Anime findById(Integer id);

    Anime createAnime (Anime anime);

    void deleteAnime(Integer id);


}
