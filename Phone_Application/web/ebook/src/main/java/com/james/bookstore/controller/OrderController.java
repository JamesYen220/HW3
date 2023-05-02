package com.james.bookstore.controller;

import com.james.bookstore.constant.Constant;
import com.james.bookstore.entity.*;
import com.james.bookstore.entity.*;
import com.james.bookstore.service.BookService;
import com.james.bookstore.service.CartService;
import com.james.bookstore.service.OrderService;
import com.james.bookstore.service.UserService;
import com.james.bookstore.utils.msgutils.Msg;
import com.james.bookstore.utils.msgutils.MsgCode;
import com.james.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {

    @Autowired
    private BookService bookService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping("/addOrder")
    //passes in 2 parameters (userid and # of items)
    @Transactional(propagation = Propagation.REQUIRES_NEW)  
    public Msg addOrder(@RequestBody Map<String,Object> params)
    {
        System.out.println("addOrder");
        System.out.println(params);
        JSONObject jsonObject = JSONObject.fromObject(params);  //create jsonobject with params (size of 2)
        Order order = new Order();  //create new order

        int userId = Integer.parseInt(jsonObject.get(Constant.USER_ID).toString()); //get userid from params
        order.setUserId(userId);    //set userid

        Timestamp time = new Timestamp(System.currentTimeMillis()); //get time
        order.setTime(time);    //set time
        orderService.addOrder(order);   //add order and assign listid (auto increment)

        int orderId = order.getListId();    //get listid and set to orderid
        JSONArray jsonArray = jsonObject.getJSONArray(Constant.ITEMS);  //create jsonarray with items (includes bookid, number, bookprice)

        for(int i = 0;i<jsonArray.size();i++)
        {
            JSONObject obj = jsonArray.getJSONObject(i);    //assign obj with items (size of 3 (bookid, number, bookprice))
            int bookId = Integer.parseInt(obj.get(Constant.BOOK_ID).toString());    //get bookid
            int number = Integer.parseInt(obj.get(Constant.BOOK_NUMBER).toString());    //get number of books
            double price = Double.parseDouble(obj.get(Constant.BOOK_PRICE).toString()); //get price

           bookService.buyBook(bookId,number);

            OrderItem orderItem = new OrderItem();  //create new orderitem
            Book book = new Book(); //create new book

            book.setBookId(bookId); //set bookid to new book
            orderItem.setBook(book);    //set orderitem book to previous book (only includes bookid nothing else)
            orderItem.setBookNumber(number);    //set book number
            orderItem.setOrderId(orderId);  //set orderid
            orderItem.setBookPrice(price);  //set price
            System.out.println(" orderService.addOrderItem(orderItem)");
 //           jdbcTemplate.update("INSERT INTO order_item (list_id, book_id, book_number, book_price) VALUES(?,?,?,?)", new Object[] { orderId, bookId, number, price });
            orderService.addOrderItem(orderItem);
        }
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.BUY_SUCCESS_MSG);
    }

    @RequestMapping("/addCart")
    //passes in 4 parameters (userid, bookid, booknumber, bookprice)
    public Msg addCart(@RequestBody Map<String,String> params)
    {
        System.out.println("addCart");
        System.out.println(params);

        JSONObject jsonObject = JSONObject.fromObject(params);  //create json object from params (size of 4)
        CartItem cartItem = new CartItem(); //create new cart
        int userId = Integer.parseInt(jsonObject.get(Constant.USER_ID).toString()); //get userid
        cartItem.setUserId(userId); //set userid
        int bookId = Integer.parseInt(jsonObject.get(Constant.BOOK_ID).toString()); //get bookid
        Book book = bookService.findBookById(bookId);   //find book by bookid and related information
        cartItem.setBook(book); //set book and related information
        int bookNumber = Integer.parseInt(jsonObject.get("bookNumber").toString()); //get book number
        cartItem.setBookNumber(bookNumber); //set book number
//        double bookPrice = Double.parseDouble(jsonObject.get(Constant.BOOK_PRICE).toString());
        double bookPrice = book.getPrice(); //get bookprice
        cartItem.setBookPrice(bookPrice);   //set bookprice
        cartService.addCart(cartItem);  //add cart through service
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.ADD_SUCCESS_MSG);
    }

    @RequestMapping("/delCartItem")
    //passes in 1 parameter(id)
    public Msg delCartItem(@RequestBody Map<String, String> params)
    {
        System.out.println("delCartItem");
        JSONObject jsonObject = JSONObject.fromObject(params);  //creates jsonobject with from params (size of 1)
        int cartItemId = Integer.parseInt(jsonObject.get("id").toString());
        cartService.delCartItemById(cartItemId);    //deletes cart item based on id
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.DELETE_SUCCESS_MSG);
    }

    @RequestMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        System.out.println("getAllOrders");
        List<User> users = userService.findAllUsers();  //returns list of array with all users
        List<Order> orders = new ArrayList<>(); //create new list of array
        for(User user:users){
            List<Order> userOrders = user.getOrders();  //adds all of users orders into a list of array
            orders.addAll(userOrders);  //adds orders from user into list of array(total orders from all users)
        }
        return orders;
    }

    @RequestMapping("/editCartItemNumber")
    //passes in 2 parameters(itemid and booknumber)
    public Msg editCartItemNumber(@RequestBody Map<String, String> params) {
        System.out.println("editCartItemNumber");
        Integer itemId = Integer.valueOf(params.get("itemId")); //gets itemid from params
        int bookNumber = Integer.parseInt(params.get("bookNumber"));    //gets booknumber from params
        CartItem cartItem = cartService.getCartItemById(itemId);    //gets cartitem and related info
        cartItem.setBookNumber(bookNumber); //set new change to booknumber
        cartService.save(cartItem); //save new change
        return MsgUtil.makeMsg(MsgCode.SUCCESS);
    }

    @RequestMapping("/getOrders")
    //passes in 1 parameter (userid)
    public List<Order> getOrders(@RequestBody Map<String, String> params) {
        System.out.println("getOrders");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID)); //get userid from params
        return userService.getOrders(userId);
    }

    @RequestMapping("/getCart")
    //passes in 1 parameter (userid)
    public List<CartItem> getCart(@RequestBody Map<String, String> params) {
        System.out.println("getCart");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID)); //get userid from params
        User user = userService.getUserById(userId);  //returns user based on userid along with related information (orders, cart, usertype, etc.)
        return user.getCart();  //gets cart and returns
    }
}



