package com.example.anime.controller;

import com.example.anime.dto.product.IOrderDetailHistory;
import com.example.anime.dto.product.OrderDto;
import com.example.anime.model.oder.OrderAnime;
import com.example.anime.model.oder.OrderDetail;
import com.example.anime.model.oder.Payment;
import com.example.anime.model.product.Anime;
import com.example.anime.service.IAnimeService;
import com.example.anime.service.IOrderService;
import com.example.anime.service.IPaymentService;
import com.example.anime.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @Autowired
    private IPaymentService paymentService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IAnimeService animeService;


    @GetMapping("cart/{id}")
    public ResponseEntity<List<OrderDetail>> getListProductDetailByUserId(@PathVariable String id) {
        List<OrderDetail> orderDetails = orderService.getCartByUserId(id);
        if (orderDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @PostMapping("/addOrder")
    public ResponseEntity<OrderAnime> add(@RequestBody OrderDto order) {
        OrderAnime orderAnime = orderService.getOrder(order.getUser());
        if (orderAnime == null) {

            Payment payment = new Payment();
            payment.setDeleteStatus(true);
            payment.setPaymentStatus(false);
            paymentService.addPayment(payment);


            OrderAnime orderClothesNew = new OrderAnime();
            orderClothesNew.setPayment(payment);
            orderClothesNew.setUser(userService.getUserById(order.getUser()));
            orderClothesNew.setDeleteStatus(true);
            orderService.addOrder(orderClothesNew);

            OrderAnime orderAnime1 = orderService.getOrder(order.getUser());
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(orderAnime1);
            orderDetail.setAnime(animeService.findById(order.getAnime()));
            orderDetail.setQuantity(order.getQuantity());
            orderService.addOrderDetail(orderDetail);


            return new ResponseEntity<>(orderAnime1, HttpStatus.OK);
        }

        OrderDetail orderDetail = new OrderDetail();
        Anime anime = animeService.findById(order.getAnime());
        List<OrderDetail> orderDetails = orderService.getCartByUserId(String.valueOf(order.getUser()));

        for (OrderDetail x : orderDetails) {
            if (x.getAnime().getId() == anime.getId()) {
                x.setQuantity(x.getQuantity() + order.getQuantity());
                orderService.addOrderDetail(x);
                return new ResponseEntity<>(orderAnime, HttpStatus.OK);
            }
        }
        orderDetail.setOrder(orderAnime);
        orderDetail.setAnime(anime);
        orderDetail.setQuantity(order.getQuantity());
        orderService.addOrderDetail(orderDetail);

        return new ResponseEntity<>(orderAnime, HttpStatus.OK);
    }

    @GetMapping("minus/{id}")
    public ResponseEntity<OrderDetail> minus(@PathVariable Integer id) {
        OrderDetail orderDetail = orderService.getOrderDetail(id);
        orderDetail.setQuantity(orderDetail.getQuantity() - 1);
        orderService.addOrderDetail(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("plus/{id}")
    public ResponseEntity<OrderDetail> plus(@PathVariable Integer id) {
        OrderDetail orderDetail = orderService.getOrderDetail(id);
        orderDetail.setQuantity(orderDetail.getQuantity() + 1);
        orderService.addOrderDetail(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("payment/{id}")
    public ResponseEntity<Payment> payment(@PathVariable Integer id, @RequestParam String note) {
        Payment payment = paymentService.getPaymentByUserId(id);
        payment.setPaymentStatus(true);
        payment.setDatePurchase(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/YYYY")));
        if(note.length() == 0) {
            payment.setShippingDescription("Không có ghi chú");
        } else {
            payment.setShippingDescription(note);
        }
        paymentService.addPayment(payment);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<OrderDetail> deleteFood(@PathVariable("id") Integer id) {
        OrderDetail orderDetail = orderService.findById(id);
        if (orderDetail == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        orderService.deleteOrderDetail(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<Page<IOrderDetailHistory>> getHistory(@PathVariable Integer id , @PageableDefault(value = 5) Pageable pageable){
        Page<IOrderDetailHistory> orderDetails = orderService.getHistory(id,pageable);
        if (orderDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orderDetails,HttpStatus.OK);
    }
}
