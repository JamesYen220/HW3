import React from 'react';
import {Descriptions, Button, message} from 'antd';
import {MoneyCollectOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {addOrder, addCart} from "../../services/userService";

export class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.setState({number: 0})
    }

    componentDidMount() {
        this.setState({number: 0})
    }

    addToCart = () => {
        const data = this.props.info;   //gets data of the book (including bookid, isbn, title, test)
        const user = JSON.parse(localStorage.getItem("user"));  //go to local storage to retrieve user information
        if (user != null) {
            let userId = user.userId;   //set userid from user(includes user info)
            let bookId = data.bookId;   //set bookid from data (includes book info)
            let bookNumber = document.getElementById("number").value;   //set booknumber
            let bookPrice = data.price; //set bookprice
            let json = {userId: userId, bookId: bookId, bookNumber: bookNumber, bookPrice: bookPrice};  //create json object with above info

            const callback = (data) => {
                if (data.status >= 0) {
                    message.success(data.msg);
                } else {
                    message.error(data.msg);
                }
            };
            addCart(json, callback);
        } else {
            message.error("请登录")
        }
    };

    buyNow = () => {
        const data = this.props.info;   //gets data of the book (including bookid, isbn, title, test)
        let user = JSON.parse(localStorage.getItem('user')); //go to local storage to retrieve user information

        if (user != null) {
            let userId = user.userId;   //set userid
            let items = []; //create array of items
            let bookId = data.bookId;   //set bookid
            let bookNumber = document.getElementById("number").value;   //set booknumber
            let bookPrice = data.price; //set bookprice
            items[0] = {bookId: bookId, number: bookNumber, bookPrice: bookPrice};  //put above info into previous created array of items
            let json = {
                userId: userId,
                items: items
            };
            //executes after addorder
            const callback = (data) => {
                if (data.status >= 0) {
                    message.success(data.msg + "请至订单界面查询订单信息");
                    let number;
                    if (this.state.number === 0) {
                        number = this.props.info.stock;
                    } else {
                        number = this.state.number;
                    }
                    number -= document.getElementById("number").value; //subtract from remaining stock
                    this.setState(
                        {
                            number: number,
                        }
                    )
                } else {
                    message.error(data.msg);
                }
            };
            addOrder(json, callback);
        } else {
            message.error("请登录")
        }
    }

    render() {
        const info = this.props.info;   //passes in book information
        if (info == null) {
            return null;
        }
        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}>
                        <img alt="bookFace" src={info.image} style={{width: "350px", height: "350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>
                                {info.title}
                            </Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>
                                {info.author}
                            </Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>
                                {info.type}
                            </Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span
                                className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>
                                {
                                    info.stock !== 0 ?
                                //if !=0 do this
                                <span>有货
                                    <span className={"inventory"}>库存
                                    {this.state.number !== 0
                                        ? <text>{this.state.number}</text>
                                        : <text>{info.stock}</text>}
                                    件</span>
                                </span> :
                                //if ==0 do this
                                <span className={"status"}>无货</span>
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>

                <div>
                    Number : <input id="number" defaultValue={1}/> {/* choose number of books to buy*/}
                </div>

                <div className={"button-groups"}>
                    <Button type="danger" size={"large"} onClick={this.addToCart}>
                        <ShoppingCartOutlined/>加入购物车
                    </Button>

                    <Button type="danger" size={"large"} onClick={this.buyNow} style={{marginLeft: "15%"}} ghost>
                        <MoneyCollectOutlined/>立即购买
                    </Button>
                </div>
            </div>

        )

    }

}
