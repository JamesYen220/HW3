import {postRequest} from "../utils/ajax";

export const getAllOrders = (data, callback) => {
    const url = `http://7ea0d112.r1.cpolar.top/getAllOrders`;
    postRequest(url, data, callback);
};

