package com.example.anime.repository.product;

import com.example.anime.dto.product.IAnimeHomeDto;
import com.example.anime.model.product.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAnimeRepository extends JpaRepository<Anime, Integer> {

    @Query(value = "SELECT a.id , a.name , a.price , i.url" +
            " FROM shop_anime.anime as a \n" +
            " join  shop_anime.image as i on a.id = i.id_anime\n" +
            "WHERE a.delete_status = 0 \n" +
            "group by a.id \n" +
            " ORDER BY  STR_TO_DATE(date_submitted, '%d/%m/%Y') desc LIMIT 8;",nativeQuery = true)
    List<IAnimeHomeDto> findAnimeHome();
}
