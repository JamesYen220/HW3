package com.james.bookstore.service.serviceimpl;

import com.james.bookstore.dao.BookDao;
import com.james.bookstore.entity.Book;
import com.james.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service = We mark beans with @Service to indicate that they're holding the business logic.
// Besides being used in the service layer, there isn't any other special use for this annotation.
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    // @Override = In a subclass, we can override or overload instance methods.
    // Overriding indicates that the subclass is replacing inherited behavior. Overloading is when a subclass is adding new behavior.
    @Override
    public Book findBookById(Integer id) {
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> findAllBooks() {
        System.out.println("BookServiceImpl");
        return bookDao.findAll();
    }

    public void buyBook(Integer bookId, Integer number) {
        bookDao.buyBook(bookId, number);
    }

    public void addBook(Book book) {
        bookDao.addBook(book);
    }


    public void deleteBookById(Integer bookId) {
        bookDao.deleteBook(bookId);
    }
}
