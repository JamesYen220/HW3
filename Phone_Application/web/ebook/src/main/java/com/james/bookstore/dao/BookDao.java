package com.james.bookstore.dao;

import com.james.bookstore.entity.Book;

import java.util.List;

public interface BookDao {

    Book findOne(Integer id);

   // List<Book> getBooks();
    List<Book> findAll();

    void buyBook(Integer bookId,Integer number);

    void deleteBook(Integer bookId);

    void addBook(Book book);
}
