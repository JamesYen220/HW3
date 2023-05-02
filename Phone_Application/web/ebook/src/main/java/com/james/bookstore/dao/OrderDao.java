package com.james.bookstore.dao;

import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderDao {
    void addOrder(Order order);
    void addOrderItem(OrderItem orderItem);

    List<Order> getAllOrders();
}
