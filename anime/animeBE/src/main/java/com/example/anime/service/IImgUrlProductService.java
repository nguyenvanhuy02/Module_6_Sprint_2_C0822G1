package com.example.anime.service;

import com.example.anime.model.product.Image;

import java.util.List;

public interface IImgUrlProductService {

    void saveImgProduct(Image image);

    List<Image> findImgByAnimeId(Integer id);

    void delete(Image image);

    Image getImgUrlProduct(Integer id);
}
