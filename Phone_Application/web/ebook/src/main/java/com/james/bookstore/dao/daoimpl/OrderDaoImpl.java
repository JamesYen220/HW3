package com.james.bookstore.dao.daoimpl;

import com.james.bookstore.dao.OrderDao;
import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.OrderItem;
import com.james.bookstore.repository.OrderItemRepository;
import com.james.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    public void addOrder( Order order)
    {
        orderRepository.saveAndFlush(order);
    }

    public void addOrderItem( OrderItem orderItem)
    {
        orderItemRepository.saveAndFlush(orderItem);
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
}
