package com.james.bookstore.dao.daoimpl;

import com.james.bookstore.dao.UserDao;
import com.james.bookstore.entity.*;
import com.james.bookstore.entity.CartItem;
import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.User;
//import com.james.bookstore.repository.UserIconRepository;
import com.james.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao{

    @Autowired
    UserRepository userRepository;


    @Override
    public User checkUser(String username, String password){
        User user = userRepository.checkUser(username,password);
        return user;
    }


    @Override
    public void  addUser(User user)
    {
        userRepository.saveAndFlush(user);
    }

    @Override
    public List<Order> getOrders(int userId){
         User user = userRepository.getUserByUserId(userId);
         return  user.getOrders();
    }

    @Override
    public List<CartItem> getCart(int userId){
        User user = userRepository.getUserByUserId(userId);
        return  user.getCart();
    }

    @Override
    public User getUserById(int userId){
        User user = userRepository.getOne(userId);
        return user;
    }

    @Override
    public List<User> getUsers()
    {
        List<User> users = userRepository.getUsers();
        List<User> ret = new ArrayList<>();
        for (User user: users
        ) {
            if(user.getUserType()!=-2)
            {
                ret.add(user);
            }
        }
        return ret;
    }

    public void deleteUser(Integer userId)
    {
        User user = userRepository.getOne(userId);
        user.setUserType(-2);
        userRepository.saveAndFlush(user);
    }

    @Override
    public void setUserType(Integer userId, Integer userType)
    {
        userRepository.setUserType(userId,userType);
    }
}
