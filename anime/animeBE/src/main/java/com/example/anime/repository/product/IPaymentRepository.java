package com.example.anime.repository.product;

import com.example.anime.model.oder.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment,Integer> {

    @Query(value = "select payment.* from payment \n" +
            "join order_anime on order_anime.payment_id = payment.id \n" +
            "join user on user.id = order_anime.user_id \n" +
            "where order_anime.user_id = :id and payment.payment_status = 0",nativeQuery = true)
    Payment getPaymentByUserId(@Param("id") Integer id);
}
