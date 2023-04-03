package com.example.anime.repository.product;

import com.example.anime.dto.product.*;
import com.example.anime.model.product.Anime;
import com.example.anime.model.product.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IAnimeRepository extends JpaRepository<Anime, Integer> {

    @Query(value = "SELECT a.id , a.name , a.price , i.url" +
            " FROM shop_anime.anime as a \n" +
            " join  shop_anime.image as i on a.id = i.id_anime\n" +
            "WHERE a.delete_status = 0 \n" +
            "group by a.id \n" +
            " ORDER BY a.id desc LIMIT 8;",nativeQuery = true)
    List<IAnimeHomeDto> findAnimeHome();

    @Query(value = "select an.id , an.name as name ,\n" +
            "             an.price as price ,\n" +
            "             i.url as url \n" +
            "            from `anime` an \n" +
            "             join `image` i \n" +
            "             on an.id = i.id_anime \n" +
            "             where an.price BETWEEN :#{#productAnimeDto.priceMin} and :#{#productAnimeDto.priceMax} \n" +
            "            and an.delete_status = 0 \n" +
            "            and an.name like %:#{#productAnimeDto.name}% \n" +
            "            group by an.id" +
            " ORDER BY an.id desc ",nativeQuery = true)
    Page<IAnimeHomeDto> findAnimeProduct(@Param("productAnimeDto")ProductAnimeDto productAnimeDto , Pageable pageable);

    @Query(value = "select an.id , an.name as name ,\n" +
            "             an.price as price ,\n" +
            "             an.date_submitted as dateSubmitted ,\n" +
            "             an.description as description ,\n" +
            "             an.quantity as quantity ,\n" +
            "             an.author as author ,\n" +
            "             an.origin as origin ,\n" +
            "             i.url as url \n" +
            "            from `anime` an \n" +
            "             join `image` i \n" +
            "             on an.id = i.id_anime \n" +
            "            and an.delete_status = 0 \n" +
            "            and an.name like %:#{#animeManagement.name}% \n" +
            "            group by an.id" +
            " ORDER BY an.id desc ",nativeQuery = true)
    Page<IAnimeManagement> findAnimeManagement(@Param("animeManagement") AnimeManagement animeManagement , Pageable pageable);

    @Modifying
    @Query(value = "update anime set delete_status = true where id = :id",nativeQuery = true)
    void deleteAnime(@Param("id") Integer id);

}
