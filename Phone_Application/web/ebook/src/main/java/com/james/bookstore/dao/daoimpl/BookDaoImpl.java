package com.james.bookstore.dao.daoimpl;

import com.james.bookstore.dao.BookDao;
import com.james.bookstore.entity.Book;
//import com.james.bookstore.entity.BookDescription;
//import com.james.bookstore.entity.UserIcon;
//import com.james.bookstore.repository.BookDescriptionRepository;
import com.james.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// @Repository =  @Repository is a Spring annotation that indicates that the decorated class is a repository.
// A repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.
// It is a specialization of the @Component annotation allowing for implementation classes to be autodetected through classpath scanning.
@Repository
public class BookDaoImpl implements BookDao{

    @Autowired
    private BookRepository bookRepository;


    @Override
    public Book findOne(Integer id){

        Book book = bookRepository.getOne(id);
        return book;
    }

    //@Override
    public List<Book> findAll() {
        List<Book> books = bookRepository.findAll();    //return a list of all books and their information(bookid, isbn, title, etc)
        for (Book book: books) {
            Integer id = book.getBookId();  //loops through all the books and get the bookid of each
        }
        List<Book> ret = new ArrayList<>();
        for (Book book: books) {
            if(book.getStock()!=-1)
            {
                ret.add(book);  //if the book's stock is above -1(value for deleted book), add the book into new list of books
            }
        }
        return ret;
    }

    public void buyBook(Integer bookId,Integer number){
        Book book = bookRepository.getOne(bookId);  //gets book selected along with it's information (bookid, isbn, title, type, etc)
        book.setStock(book.getStock()- number); //subtract the number of copies brought by the total stock avaliable and set to new avaliable stock
        bookRepository.saveAndFlush(book);  //save change
    }

    public void deleteBook(Integer bookId)
    {
        Book book = bookRepository.getOne(bookId);  //gets book selected along with it's information (bookid, isbn, title, type, etc)
        book.setStock(-1);  //set the stock as -1(book is deleted)
        bookRepository.saveAndFlush(book);  //save change
    }

    public void addBook(Book book)
    {
        bookRepository.saveAndFlush(book);
    }
}
