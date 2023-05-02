import {postRequest, postRequestForm} from "../utils/ajax";

export const getBooks = (data, callback) => {
  //  debugger
    const url = `http://7ea0d112.r1.cpolar.top/getBooks`;
    postRequest(url, data, callback);
 //   debugger
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `http://7ea0d112.r1.cpolar.top/getBook`;
    postRequestForm(url, data, callback);
};

export const deleteBook = (id, callback) => {
    const data = {id: id};
    const url = `http://7ea0d112.r1.cpolar.top/deleteBook`;
    postRequestForm(url, data, callback);
};

export const addBook = (data,callback) => {
    const url = `http://7ea0d112.r1.cpolar.top/addBook`;
    postRequest(url, data, callback);
};

export const editBook = (data,callback) =>
{
    const url = `http://7ea0d112.r1.cpolar.top/editBook`;
    postRequest(url, data, callback);
};
