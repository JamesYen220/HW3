package com.james.bookstore.dao;

import com.james.bookstore.entity.CartItem;
import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.User;

import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);

    void addUser(User user);

    User getUserById(int userId);

    List<Order> getOrders(int userId);

    List<CartItem> getCart(int userId);

    List<User> getUsers();

    void setUserType(Integer userId, Integer userType);

    void deleteUser(Integer userId);


}
