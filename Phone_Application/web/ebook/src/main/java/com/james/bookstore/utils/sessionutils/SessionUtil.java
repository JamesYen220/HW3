package com.james.bookstore.utils.sessionutils;

import com.james.bookstore.constant.Constant;
import net.sf.json.JSONObject;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {


    public static JSONObject getAuth(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        // Session
        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null) {
                JSONObject ret = new JSONObject();
                ret.put(Constant.USER_ID, (Integer)session.getAttribute(Constant.USER_ID));
                ret.put(Constant.USERNAME, (String)session.getAttribute(Constant.USERNAME));
                ret.put(Constant.USER_TYPE, (Integer)session.getAttribute(Constant.USER_TYPE));
                return ret;
            }
        }
        return null;
    }

    public static void setSession(JSONObject data){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        // Session
        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession();
            //loops 3 times (userid, username, usertype)
            for(Object str:data.keySet()){  //first time str:"userid". second time str:"username". third time, str: "usertype"
                String key = (String)str;   //first time get key: userid. second time get key: username. third time get key: usertype
                Object val = data.get(key); //first time get val: 1. second time get val: root. third time val: 0
                session.setAttribute(key, val); //used to set the value of an attribute in a given scope where the name of the attribute, the value of attribute and scope of the attribute is passed as parameters

            }
        }
    }

    public static Boolean removeSession(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        // Session
        if(requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null) {
                session.invalidate();
            }
        }
        return true;
    }

    //    public static boolean checkAuth(){
//        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//        // Session
//        if(requestAttributes != null) {
//            HttpServletRequest request = requestAttributes.getRequest();
//            HttpSession session = request.getSession(false);
//
//            if(session != null) {
//                Integer userType = (Integer) session.getAttribute(Constant.USER_TYPE);
//                return userType != null && userType >= 0;
//            }
//        }
//        return false;
//    }
}
