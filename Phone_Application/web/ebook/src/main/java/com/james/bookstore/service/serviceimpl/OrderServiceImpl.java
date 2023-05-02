package com.james.bookstore.service.serviceimpl;

import com.james.bookstore.dao.OrderDao;
import com.james.bookstore.entity.Order;
import com.james.bookstore.entity.OrderItem;
import com.james.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

     @Autowired
    private OrderDao orderDao;

    public void addOrder( Order order)
    {
        orderDao.addOrder(order);
    }

    public void addOrderItem( OrderItem orderItem)
    {
        orderDao.addOrderItem(orderItem);
    }

    public List<Order> getAllOrders(){
        return orderDao.getAllOrders();
    }
}
