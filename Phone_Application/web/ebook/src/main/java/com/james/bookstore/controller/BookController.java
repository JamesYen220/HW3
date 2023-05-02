package com.james.bookstore.controller;

import com.james.bookstore.constant.Constant;
import com.james.bookstore.entity.Book;
import com.james.bookstore.service.BookService;
import com.james.bookstore.utils.msgutils.Msg;
import com.james.bookstore.utils.msgutils.MsgCode;
import com.james.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

//@RestController = Every request handling method of the controller class automatically serializes return objects into HttpResponse.
@RestController
public class BookController {

    //@Autowired = The Spring framework enables automatic dependency injection. In other words, by declaring all the bean dependencies
    // in a Spring configuration file, Spring container can autowire relationships between collaborating beans. This is called Spring
    // bean autowiring
    // usually your own created bean (autowire makes bean go live)
    @Autowired
    private BookService bookService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // @RequestMapping = Simply put, the annotation is used to map web requests to Spring Controller methods.
    // The HTTP method parameter has no default. So, if we don't specify a value, it's going to map to any HTTP request.
    @RequestMapping("/getBooks")
    public List<Book> findAll() {
        List<Book> books;
        System.out.println("getBooks when stock = -1 inactive");
//         books= jdbcTemplate.query("select book_Id, ISBN,title,type,author,price,description,stock,image from book where stock != -1", BeanPropertyRowMapper.newInstance(Book.class));
//         return books;
        return bookService.findAllBooks();
    }

    @RequestMapping("/getBook")
    // @RequestParam = Simply put, we can use @RequestParam to extract query parameters, form parameters, and even files from the request.
    public Book getBook(@RequestParam("id") Integer id) {
        System.out.println("getBook: " + id);
        Book book;
        Integer book_Id =id;
//        return   book = jdbcTemplate.queryForObject(" select book_Id, author,description,image,ISBN,price,stock,title,type from book WHERE book_Id=?",
//                BeanPropertyRowMapper.newInstance(Book.class), book_Id);
       return bookService.findBookById(id);
    }

    @RequestMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("id") Integer id) {
        System.out.println("deleteBook: " + id);
        Integer book_Id=id;
        //update book table stock = -1 deactive. getall books will reflect new changes
//        jdbcTemplate.update("update book set stock= -1 WHERE book_Id=?", book_Id);
        bookService.deleteBookById(id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_SUCCESS_MSG);
    }

    @RequestMapping("/addBook")
    //passes in params (title, author, image, isbn, price, stock, description)
    public Msg addBook(@RequestBody Map<String, String> params) {
        System.out.println("addBook:");
        System.out.println(params);

        //读json
        String title = params.get(Constant.TITLE);  //sets title from params
        String isbn = params.get(Constant.ISBN);    //sets isbn from params
        String author = params.get(Constant.AUTHOR);    //sets author from params
        Double price = Double.valueOf(params.get(Constant.PRICE));  //sets price from params
        String description = params.get(Constant.DESCRIPTION);  //sets description from params
        int stock = Integer.parseInt(params.get(Constant.STOCK));   //sets stock from params
        String image = params.get(Constant.IMAGE);  //sets image from params

        //组装book
        Book book = new Book(); //create new book from repository
        book.setTitle(title);   //set title
        book.setIsbn(isbn); //set isbn
        book.setType("test");
        book.setAuthor(author); //set author
        book.setPrice(price);   //set price
        book.setStock(stock);   //set stock
        book.setImage(image);   //set image
        book.setDescription(description);   //set description
//        jdbcTemplate.update("INSERT INTO book (book_Id, author,description,image,ISBN,price,stock,title,type) VALUES(?,?,?,?,?,?,?,?,?)",
//                new Object[] { book.getBookId(), book.getAuthor(), book.getDescription(),book.getImage(), book.getIsbn(), book.getPrice(), book.getStock(),book.getTitle(),book.getType() });

        bookService.addBook(book);  //add book through service (bookid auto incremented)
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_SUCCESS_MSG);

    }

    @RequestMapping("/editBook")
    //passes in 8 parameters (bookid, title, author, image, isbn, stock, price, description)
    public Msg editBook(@RequestBody Map<String, String> params) {
        System.out.println("editBook:");

        System.out.println(params);
        Integer book_Id = Integer.valueOf(params.get(Constant.BOOK_ID));    //sets bookid from params
        String title = params.get(Constant.TITLE);  //sets title from params
        String isbn = params.get(Constant.ISBN);    //sets isbn from params
        String author = params.get(Constant.AUTHOR);    //sets author from params
        Double price = Double.valueOf(params.get(Constant.PRICE));  //sets price from params
        String description = params.get(Constant.DESCRIPTION);  //sets description from params
        int stock = Integer.parseInt(params.get(Constant.STOCK));   //sets stock from params
        String image = params.get(Constant.IMAGE);  //sets image from params

//        jdbcTemplate.update("UPDATE book SET title=?, ISBN=?, author=?, price=? , stock=? , image=?, description=? WHERE book_Id=?",
//                new Object[] { title, isbn, author, price, stock, image, description, book_Id });

        //组装book
        Book book = bookService.findBookById(book_Id);  //finds book based on bookid and previous params
        book.setTitle(title);   //sets new title
        book.setIsbn(isbn); //sets new isbn
        book.setAuthor(author); //sets new author
        book.setPrice(price);   //sets new price
        book.setStock(stock);   //sets new stock
        book.setImage(image);   //sets new image
        book.setDescription(description);   //sets new description


        bookService.addBook(book);  //edits book by committing changes through addbook services

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_SUCCESS_MSG);
    }

}
