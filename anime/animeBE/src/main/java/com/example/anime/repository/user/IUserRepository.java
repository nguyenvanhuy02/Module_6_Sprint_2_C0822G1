package com.example.anime.repository.user;

import com.example.anime.dto.user.UserDto;
import com.example.anime.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Integer> {
    Boolean existsByEmail (String email);
}
