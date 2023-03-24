package com.example.anime.service;

import com.example.anime.model.user.User;

public interface IUserService {
    User getUserById(Integer id);

    void createUser(User user);
}
