package com.example.anime.service.impl;

import com.example.anime.dto.product.*;
import com.example.anime.model.product.Anime;
import com.example.anime.repository.product.IAnimeRepository;
import com.example.anime.service.IAnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimeService implements IAnimeService {

    @Autowired
    private IAnimeRepository animeRepository;
    @Override
    public List<IAnimeHomeDto> findAnimeHome() {
        return animeRepository.findAnimeHome();
    }

    @Override
    public Page<IAnimeHomeDto> findProductAnime(ProductAnimeDto animeDto, Pageable pageable) {
        return animeRepository.findAnimeProduct(animeDto,pageable);
    }

    @Override
    public Page<IAnimeManagement> findAnimeManagement(AnimeManagement animeManagement, Pageable pageable) {
        return animeRepository.findAnimeManagement(animeManagement,pageable);
    }

    @Override
    public Anime findById(Integer id) {
        return animeRepository.findById(id).orElse(null);
    }

    @Override
    public Anime createAnime(Anime anime) {
        return animeRepository.save(anime);
    }


}
