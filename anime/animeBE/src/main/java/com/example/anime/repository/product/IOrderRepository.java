package com.example.anime.repository.product;

import com.example.anime.model.oder.OrderAnime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderRepository extends JpaRepository<OrderAnime,Integer> {

    @Query(value = "select `order_anime`.* from order_anime\n" +
            "  join `payment` on order_anime.payment_id = payment.id \n" +
            " join `user` on user.id = order_anime.user_id \n" +
            " where order_anime.user_id = :idUser and payment.payment_status = 0 ",nativeQuery = true)
    OrderAnime getOrder(@Param("idUser") Integer user);
}
