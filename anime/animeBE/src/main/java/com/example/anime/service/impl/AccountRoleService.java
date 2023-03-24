package com.example.anime.service.impl;

import com.example.anime.repository.account.IAccountRoleRepository;
import com.example.anime.service.IAccountRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountRoleService implements IAccountRoleService {

    @Autowired
    private IAccountRoleRepository accountRoleRepository;
    @Override
    public void createAccountRole(Integer accountId, Integer roleId) {
        accountRoleRepository.createAccountRole(accountId,roleId);
    }
}
