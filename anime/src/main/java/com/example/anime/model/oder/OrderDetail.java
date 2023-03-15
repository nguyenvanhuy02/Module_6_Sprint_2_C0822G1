package com.example.anime.model.oder;


import com.example.anime.model.product.Anime;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantity;
    private boolean deleteStatus;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderAnime order;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "anime_id", referencedColumnName = "id")
    private Anime anime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(boolean deleteStatus) {
        this.deleteStatus = deleteStatus;
    }

    public OrderAnime getOrder() {
        return order;
    }

    public void setOrder(OrderAnime order) {
        this.order = order;
    }

    public Anime getAnime() {
        return anime;
    }

    public void setAnime(Anime anime) {
        this.anime = anime;
    }
}