package com.example.anime.dto.respone;

public class MessageRespone {

    private String message = "ok";
    private String message2 = "ok";

    public MessageRespone() {
    }

    public String getMessage2() {
        return message2;
    }

    public void setMessage2(String message2) {
        this.message2 = message2;
    }

    public MessageRespone(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
