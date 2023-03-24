package com.example.anime.service;

import com.example.anime.model.account.Account;

public interface IAccountService {

    Account findAccountByUsername(String username);

    Account createAccount(Account account);
}
