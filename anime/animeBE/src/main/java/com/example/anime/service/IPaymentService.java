package com.example.anime.service;

import com.example.anime.model.oder.Payment;

public interface IPaymentService {

    void addPayment(Payment payment);

    Payment getPaymentByUserId(Integer id);
}
