package com.example.anime.controller;

import com.example.anime.dto.respone.MessageRespone;
import com.example.anime.dto.user.UserDto;
import com.example.anime.model.account.Account;
import com.example.anime.model.user.User;
import com.example.anime.service.IAccountRoleService;
import com.example.anime.service.IAccountService;
import com.example.anime.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IAccountRoleService accountRoleService;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto) {
        if (accountService.existsByUserName(userDto.getUserName())){
            return new ResponseEntity<>( new MessageRespone("nousername"),HttpStatus.OK);
        }
        if (userService.existsByEmail(userDto.getEmail())){
            return new ResponseEntity<>( new MessageRespone("noemail"),HttpStatus.OK);
        }
        User user = new User();
        Account account = new Account();
        BeanUtils.copyProperties(userDto, account);


        BeanUtils.copyProperties(userDto,userService);
        account.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Account account1 = accountService.createAccount(account);

        BeanUtils.copyProperties(userDto, user);

        user.setAccount(account1);
        user.setDeleteStatus(false);


        userService.createUser(user);
        accountRoleService.createAccountRole(user.getAccount().getId(), 2);
        return new ResponseEntity<>(new MessageRespone("yes"),HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<User> detail(@PathVariable Integer id){
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
}
