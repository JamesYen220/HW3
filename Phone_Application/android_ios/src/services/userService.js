import { postRequest, postRequestForm } from "../utils/ajax";
import { message } from "antd";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (data, navigation) => {
    const url = `http://7ea0d112.r1.cpolar.top/login`;
    const callback = (data) => {
        if (data.status >= 0) {
            if (data.data.userType === -1) {
                message.error("您的账号已经被禁用！");
            } else {
                AsyncStorage.setItem("user", JSON.stringify(data.data));
                navigation.navigate("LoginView");
                message.success(data.msg);
            }
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const register = (data, navigation) => {
    const url = `http://7ea0d112.r1.cpolar.top/register`;
    const callback = (data) => {
        if (data.status >= 0) {
            AsyncStorage.setItem("user", JSON.stringify(data.data));
            navigation.navigate("Home");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = (navigation) => {
    const url = `http://7ea0d112.r1.cpolar.top/logout`;
    const callback = (data) => {
        if (data.status >= 0) {
            AsyncStorage.removeItem("user");
            navigation.navigate("Home");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};
