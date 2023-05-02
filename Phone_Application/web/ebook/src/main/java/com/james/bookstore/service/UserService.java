package com.james.bookstore.service;

import com.james.bookstore.entity.CartItem;
import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.User;
import org.springframework.context.annotation.Scope;

import java.util.List;

@Scope("session")
public interface UserService {

    User checkUser(String username, String password);

    void addUser(User user);

    List<Order> getOrders(Integer userId);

    List<CartItem> getCart(Integer userId);

    User getUserById(Integer userId);

    List<User> findAllUsers();

    void setUserType(Integer userId, Integer userType);

    void deleteUserById(Integer id);


}
