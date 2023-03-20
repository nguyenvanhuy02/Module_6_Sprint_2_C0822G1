package com.example.anime.service;

import com.example.anime.dto.product.IAnimeHomeDto;

import java.util.List;

public interface IAnimeService {
    List<IAnimeHomeDto> findAnimeHome();
}
