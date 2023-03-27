package com.example.anime.repository.product;

import com.example.anime.model.product.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IImgUrlProductRepository extends JpaRepository<Image, Integer> {

    @Modifying
    @Query(value = "INSERT INTO image (url,id_anime) VALUES (:url, :id_anime)", nativeQuery = true)
    void createImgProduct(@Param("url") String url,
                          @Param("id_anime") Integer id);
}
