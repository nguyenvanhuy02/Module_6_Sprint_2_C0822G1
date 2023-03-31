package com.example.anime.service;

import com.example.anime.dto.product.IOrderDetailHistory;
import com.example.anime.dto.product.IQuantityCartDto;
import com.example.anime.model.oder.OrderAnime;
import com.example.anime.model.oder.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {

    void addOrder(OrderAnime orderAnime);

    List<OrderDetail> getCartByUserId(String id);

    OrderAnime getOrder(Integer user);

    void addOrderDetail(OrderDetail orderDetail);

    OrderDetail getOrderDetail(Integer id);

    void deleteOrderDetail(Integer id);

    OrderDetail findById(Integer id);

    Page<IOrderDetailHistory> getHistory(Integer id , Pageable pageable);

    OrderDetail findByIdAnime(Integer idUser , Integer idAnime);
}
