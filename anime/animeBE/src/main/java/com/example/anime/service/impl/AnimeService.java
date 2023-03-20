package com.example.anime.service.impl;

import com.example.anime.dto.product.IAnimeHomeDto;
import com.example.anime.repository.product.IAnimeRepository;
import com.example.anime.service.IAnimeService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
