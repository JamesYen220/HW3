package com.james.bookstore.controller;

import com.james.bookstore.constant.Constant;
import com.james.bookstore.entity.*;
import com.james.bookstore.entity.User;
import com.james.bookstore.service.UserService;
import com.james.bookstore.utils.msgutils.Msg;
import com.james.bookstore.utils.msgutils.MsgCode;
import com.james.bookstore.utils.msgutils.MsgUtil;
import com.james.bookstore.utils.sessionutils.SessionUtil;

import org.springframework.web.client.RestTemplate;
import java.util.List;

import net.sf.json.JSONObject;
import org.apache.commons.lang.time.StopWatch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@Scope("session")
public class UserController {

    @Autowired
    private UserService userService;
    private StopWatch watch;

    @RequestMapping("/getUsers")
    public List<User> getUsers() {
        System.out.println("getUsers");
        return userService.findAllUsers();  //returns list of all users
    }

//    @RequestMapping("/getUsers")
//    public List<User> getUsers() {
//    String url = "http://202.120.40.86:14642/rmp-resource-service/project/644e483c6da1a40015f121d0/resource/user_public";
//    RestTemplate restTemplate = new RestTemplate();
//    UserResponse response = restTemplate.getForObject(url, UserResponse.class);
//    System.out.println("lujunchen" + response.getData());
//
//    if (response != null) {
//        return response.getData();
//    } else {
//        throw new RuntimeException("Failed to fetch data from the URL");
//    }
//}



    @RequestMapping("/login")
    //passes in params(username, password, root)
    public Msg login(@RequestBody Map<String, String> params) {
        System.out.println("login");
        String username = params.get(Constant.USERNAME);  //sets username from params
        String password = params.get(Constant.PASSWORD);  //sets password from params
        User auth = userService.checkUser(username, password); //returns all user info(orders, carts, usertype,etc.)
        if (auth != null) {
            watch = new StopWatch();
            watch.start();
            JSONObject obj = new JSONObject();  //creates jsonobject
            obj.put(Constant.USER_ID, auth.getUserId());    //inserts userid (1 for root)
            obj.put(Constant.USERNAME, auth.getUsername()); //inserts username( root for root)
            obj.put(Constant.USER_TYPE, auth.getUserType()); //inserts usertype (0 for root)
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD); //removes password for security reasons
            data.remove(Constant.USERICON);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        } else {
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/logout")
    public Msg logout() {
        System.out.println("logout");
        String timeused =watch.getTime()+" ns";
        watch.stop();
        Boolean status = SessionUtil.removeSession(); //returns status true if user is logged in
        if (status) {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG+" Timer: "+timeused );
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/register")
    //passes in 6 parameters (username, password, confirm (password), email, address, and agreement (checked or not)
    public Msg register(@RequestBody Map<String, String> params) {
        System.out.println("register");

        String username = params.get(Constant.USERNAME);    //gets username from params

        List<User> tests = userService.findAllUsers();  //returns list of all users

        for (User test: tests)  //loops through all users one at a time to see if username is taken
        {
            if (test.getUsername().equals(username)){
                return MsgUtil.makeMsg(MsgCode.REGISTER_USER_ERROR);
            }
        }

        String password = params.get(Constant.PASSWORD);    //gets password from params
        String email = params.get(Constant.EMAIL);  //gets email from params
        String address = params.get(Constant.ADDRESS);  //gets address from params
        User user = new User(); //create new user from repository (userid is auto incremented because of @GeneratedValue)
        user.setUsername(username); //set new user username
        user.setPassword(password); //set new user password
        user.setUserType(Constant.CUSTOMER); //set new user usertype(to customer)
        user.setEmail(email);   //set new user email
        user.setAddress(address); //set new user address

        userService.addUser(user);  //adds user through userservice

        JSONObject obj = new JSONObject();  //create new jsonobject
        obj.put(Constant.USER_ID, user.getUserId());    //insert userid (auto increament) to newly created object
        obj.put(Constant.USERNAME, user.getUsername()); //insert username to newly created object
        obj.put(Constant.USER_TYPE, user.getUserType());  //insert usertype to newly created object
        SessionUtil.setSession(obj);    //store in session

        JSONObject data = JSONObject.fromObject(user);  //set jsondata (size 9 address, cart, email, icon, orders, password, userid, usertype, username)
        data.remove(Constant.PASSWORD); //removes password for security reasons

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.REGISTER_SUCCESS_MSG, data);
    }


    @RequestMapping("/editUser")
    //passes in two parameters (userid and usertype)
    public Msg editUser(@RequestBody Map<String, String> params) {
        System.out.println("editUser");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID)); //set userid based on params userid passed in
        User user = userService.getUserById(userId);    //returns user based on userid along with it's corresponding address, cart, email, icon, orders, password, userid, usertype, username etc
        System.out.println(user);
        Integer userType = Integer.valueOf(params.get(Constant.USER_TYPE)); //set usertype based on params usertype passed in
        user.setUserType(userType); //sets user type to new usertype
        System.out.println(userType);
        userService.addUser(user);
        return MsgUtil.makeMsg(MsgCode.SUCCESS);
    }

    @RequestMapping("/deleteUser")
    //passes in userid of selected deleted user
    public Msg deleteBook(@RequestParam("id") Integer id) {
        System.out.println("deleteBook: " + id);
        userService.deleteUserById(id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_SUCCESS_MSG);
    }

    @RequestMapping("/checkSession")
    public Msg checkSession() {
        System.out.println("checkSession");
        JSONObject auth = SessionUtil.getAuth();

        if (auth == null) {
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        } else {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }

    @RequestMapping("/getUserById")
    public User getUserById(@RequestBody Map<String, String> params) {
        System.out.println("getUserById");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID));
        return userService.getUserById(userId);
    }
}
