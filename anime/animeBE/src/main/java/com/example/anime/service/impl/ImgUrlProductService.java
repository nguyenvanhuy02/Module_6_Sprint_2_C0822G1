package com.example.anime.service.impl;

import com.example.anime.model.product.Image;
import com.example.anime.repository.product.IImgUrlProductRepository;
import com.example.anime.service.IImgUrlProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImgUrlProductService implements IImgUrlProductService {

    @Autowired
    private IImgUrlProductRepository imgUrlProductRepository;

    @Override
    public void saveImgProduct(Image image) {
        imgUrlProductRepository.createImgProduct(image.getUrl(), image.getAnime().getId());
    }

    @Override
    public List<Image> findImgByAnimeId(Integer id) {
        return imgUrlProductRepository.findImgByAnimeId(id);
    }

    @Override
    public void delete(Image image) {
        imgUrlProductRepository.delete(image);
    }

    @Override
    public Image getImgUrlProduct(Integer id) {
        return imgUrlProductRepository.findById(id).orElse(null);
    }
}
