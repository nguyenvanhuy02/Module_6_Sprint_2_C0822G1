package com.example.anime.repository.account;

import com.example.anime.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account, Integer> {

    @Query(
            value = " select * " +
                    " from account " +
                    " where user_name = :username ",
            nativeQuery = true
    )
    Account findAccountByUsername(@Param("username") String username);

    Optional<Account> findByUserName (String name);

    Boolean existsByUserName ( String username);
}
