package com.example.anime.service.impl;

import com.example.anime.model.product.Image;
import com.example.anime.repository.product.IImgUrlProductRepository;
import com.example.anime.service.IImgUrlProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImgUrlProductService implements IImgUrlProductService {

    @Autowired
    private IImgUrlProductRepository imgUrlProductRepository;

    @Override
    public void saveImgProduct(Image image) {
        imgUrlProductRepository.createImgProduct(image.getUrl(), image.getAnime().getId());
    }
}
