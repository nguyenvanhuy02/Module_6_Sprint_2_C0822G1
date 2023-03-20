package com.example.anime.dto.respone;

import com.example.anime.model.account.Account;
import com.example.anime.model.user.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtRespone {
    private Integer id;
    private String token;
    private Collection<? extends GrantedAuthority> roles;
    private String email;
    private Account account;
    private User user;

    public JwtRespone(String token, Collection<? extends GrantedAuthority> roles,
                      Account account, User user) {
        this.token = token;
        this.roles = roles;
        this.account = account;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
