package com.james.bookstore.service;

import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderService {
    void addOrder(Order order);
    void addOrderItem(OrderItem orderItem);

    List<Order> getAllOrders();
}
