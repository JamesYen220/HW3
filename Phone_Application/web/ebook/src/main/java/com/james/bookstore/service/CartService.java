package com.james.bookstore.service;

import com.james.bookstore.entity.CartItem;

public interface CartService {
    void addCart(CartItem cartItem);

    CartItem getCartItemById(Integer cartId);

    void delCartItemById(Integer cartId);

    void save(CartItem cartItem);
}
