package com.example.anime.service.impl;

import com.example.anime.model.oder.OrderAnime;
import com.example.anime.model.oder.OrderDetail;
import com.example.anime.repository.product.IOrderDetailRepository;
import com.example.anime.repository.product.IOrderRepository;
import com.example.anime.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Override
    public void addOrder(OrderAnime orderAnime) {
        orderRepository.save(orderAnime);
    }

    @Override
    public List<OrderDetail> getCartByUserId(String id) {
        return orderDetailRepository.getCartByUserId(id);
    }

    @Override
    public OrderAnime getOrder(Integer user) {
        return orderRepository.getOrder(user);
    }

    @Override
    public void addOrderDetail(OrderDetail orderDetail) {
        orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail getOrderDetail(Integer id) {
        return orderDetailRepository.findById(id).orElse(null);
    }
}
