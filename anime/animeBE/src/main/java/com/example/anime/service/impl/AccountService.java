package com.example.anime.service.impl;

import com.example.anime.model.account.Account;
import com.example.anime.repository.account.IAccountRepository;
import com.example.anime.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public Account findAccountByUsername(String username) {
        return accountRepository.findAccountByUsername(username);
    }

    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Boolean existsByUserName(String username) {
        return accountRepository.existsByUserName(username);
    }

    @Override
    public Optional<Account> findByName(String userName) {
        return accountRepository.findByUserName(userName);
    }

    @Override
    public void updatePassword(String password, String userName) {
        accountRepository.changePassword(password,userName);
    }
}
