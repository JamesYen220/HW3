package com.james.bookstore.repository;

import com.james.bookstore.entity.Book;
import com.james.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartItem,Integer> {

    CartItem findCartItemByBookAndUserId(Book book,int UserId);
}
