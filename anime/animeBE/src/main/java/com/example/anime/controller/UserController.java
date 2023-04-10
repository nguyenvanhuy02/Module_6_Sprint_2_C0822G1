package com.example.anime.controller;

import com.example.anime.dto.EmailDto;
import com.example.anime.dto.respone.MessageRespone;
import com.example.anime.dto.user.ChangePasswordForm;
import com.example.anime.dto.user.UserDto;
import com.example.anime.dto.user.UserName;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;

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

    @PostMapping("/checkUniqueEmail")
    public ResponseEntity<?> checkUnique(@RequestBody EmailDto emailDto) {
        if (userService.existsByEmail(emailDto.getEmail())) {
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }

    @PostMapping("/checkUniqueUserName")
    public ResponseEntity<?> checkUniqueUserName(@RequestBody UserName userName) {
        if (accountService.existsByUserName(userName.getUserName())) {
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
        User user = new User();
        Account account = new Account();
        BeanUtils.copyProperties(userDto, account);


        BeanUtils.copyProperties(userDto, userService);
        account.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Account account1 = accountService.createAccount(account);

        BeanUtils.copyProperties(userDto, user);

        user.setAccount(account1);
        user.setDeleteStatus(false);


        userService.createUser(user);
        accountRoleService.createAccountRole(user.getAccount().getId(), 2);
        return new ResponseEntity<>(new MessageRespone("yes"), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<User> detail(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordForm changePasswordForm, BindingResult bindingResult) {
        if (!Objects.equals(changePasswordForm.getNewPassword(), changePasswordForm.getConfirmPassword())) {
            bindingResult.rejectValue("confirmPassword", "confirmPassword", "Mật khẩu xác nhận không trùng với mật khẩu mới");
        }
        Account account = accountService.findByName(changePasswordForm.getUserName()).orElse(null);
        assert account != null;
        if (!passwordEncoder.matches(changePasswordForm.getPassword(), account.getPassword())) {
            bindingResult.rejectValue("password", "password", "Bạn đã nhập sai mật khẩu cũ");
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        if (passwordEncoder.matches(changePasswordForm.getPassword(), account.getPassword())) {
            account.setPassword(passwordEncoder.encode(changePasswordForm.getNewPassword()));
            accountService.updatePassword(account.getPassword(), account.getUserName());
            return new ResponseEntity<>(new MessageRespone("Cập nhật mật khẩu thành công"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new MessageRespone("Thay đổi mật khẩu thất bại"), HttpStatus.BAD_REQUEST);
    }
}
