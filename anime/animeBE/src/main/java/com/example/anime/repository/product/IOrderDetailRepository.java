package com.example.anime.repository.product;

import com.example.anime.dto.product.IOrderDetailHistory;
import com.example.anime.model.oder.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
            "join `anime` on anime.id = order_detail.anime_id where payment.payment_status = 0 and user.id = :userId and order_detail.delete_status = false ", nativeQuery = true)
    List<OrderDetail> getCartByUserId(@Param("userId") String id);

    @Modifying
    @Query(value = "update order_detail set delete_status = true where id = :id",nativeQuery = true)
    void deleteOrderDetailId(@Param("id") Integer id);


    @Query(value = "select a.id ,\n" +
            "       a.name as name , \n" +
            "       p.date_purchase as datePurchase ,\n" +
            "       a.price as price ,\n" +
            "       a.author as author ,\n" +
            "       od.quantity as quantity\n" +
            "from `order_detail` od\n" +
            "join `order_anime` oa on oa.id = od.order_id\n" +
            "join `user` u on u.id = oa.user_id\n" +
            "join `payment` p on p.id = oa.payment_id\n" +
            "join `anime` a on a.id = od.anime_id where p.payment_status = 1 and u.id = :userId and od.delete_status = false ORDER BY od.id desc ", nativeQuery = true)
    Page<IOrderDetailHistory> getHistory(@Param("userId") Integer id , Pageable pageable);

}
