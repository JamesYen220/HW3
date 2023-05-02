package com.james.bookstore.dao;

import com.james.bookstore.entity.CartItem;

public interface CartDao {
    void deleteCartItem(Integer id);
    void addCartItem(CartItem cartItem);
    CartItem getCartItemById(Integer cartId);

    void save(CartItem cartItem);
}
