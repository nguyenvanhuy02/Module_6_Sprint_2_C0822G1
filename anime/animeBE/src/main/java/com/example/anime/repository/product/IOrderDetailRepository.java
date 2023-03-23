package com.example.anime.repository.product;

import com.example.anime.model.oder.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    @Query(value = "select shop_anime.order_detail.* from order_detail\n" +
            "join `order_anime` on order_anime.id = order_detail.order_id\n" +
            "join `user` on `user`.id = order_anime.user_id\n" +
            "join `payment` on payment.id = order_anime.payment_id \n" +
            "join `anime` on anime.id = order_detail.anime_id where payment.payment_status = 0 and user.id = :userId", nativeQuery = true)
    List<OrderDetail> getCartByUserId(@Param("userId") String id);

}
