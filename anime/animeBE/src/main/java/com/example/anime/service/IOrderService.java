package com.example.anime.service;

import com.example.anime.model.oder.OrderAnime;
import com.example.anime.model.oder.OrderDetail;

import java.util.List;

public interface IOrderService {

    void addOrder(OrderAnime orderAnime);

    List<OrderDetail> getCartByUserId(String id);

    OrderAnime getOrder(Integer user);

    void addOrderDetail(OrderDetail orderDetail);

    OrderDetail getOrderDetail(Integer id);
}
