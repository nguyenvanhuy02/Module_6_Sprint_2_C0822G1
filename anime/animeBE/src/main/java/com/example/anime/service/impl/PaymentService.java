package com.example.anime.service.impl;

import com.example.anime.model.oder.Payment;
import com.example.anime.repository.product.IPaymentRepository;
import com.example.anime.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    private IPaymentRepository paymentRepository;

    @Override
    public void addPayment(Payment payment) {
        paymentRepository.save(payment);
    }
}
