import React from 'react';
import {DatePicker, Input, List, message} from 'antd'
import {getAllOrders} from "../../services/orderService";
import OrderDetail from "./OrderDetail";

const {Search} = Input;

const { RangePicker } = DatePicker;

export class OrderTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            showOrders: [],
            searchValue: '',
        };
    }

    componentDidMount() {

        const callback = (data) => {
          //  debugger;
            this.setState({orders: data, showOrders: data});    //setstate to list of array with all orders
        };

        let user = JSON.parse(localStorage.getItem('user'));    //get user from local storage
        if (user === null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("你没有权限");
        } else {
            getAllOrders({"search": null}, callback);
        }
    }

    //value = the input in the search bar
    searchChange = ({target: {value}}) => {
        this.setState({searchValue: value}) //set the state to the value (what you search for)
        let arr = [];
        let list = this.state.orders;   //set list to an array with all the orders
        let search = value.toLowerCase();   //set the input to lowercase
        //each order may have multiple books that we have to loop thru
        for (let i = 0; i < list.length; i++) {
            if (
                list[i].listId.toString() === search.toString()||
                list[i].userId.toString() === search.toString()
            ) {
                arr.push(list[i]);
            }
            for (let j = 0; j < list[i].items.length; j++) {
                if (
                    list[i].items[j].book.title.toLowerCase().indexOf(search) >= 0
                ) {
                    arr.push(list[i]);
                }
            }
        }
        ;
        this.setState(
            {showOrders: arr}    //set state to all matching results (array arr)
        );
    }

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState(
                {showOrders: this.state.orders}
            );
            return;
        }
        console.log('Formatted Selected Time: ', dateString);
        const startTime= new Date(Date.parse(dateString[0]));
        const endTime=new Date(Date.parse(dateString[1]));
        let arr = [];
        let list = this.state.showOrders;
        for (let i = 0; i < list.length; i++) {
            let time = new Date(Date.parse(list[i].time));
            if (
                time >startTime && time<endTime
            ) {
                arr.push(list[i]);
            }
        }
        this.setState(
            {showOrders: arr}
        );
    }

    render() {
        return (
            <div>
                <br/>
                <Search value={this.state.searchValue} placeholder="search for orders" onChange={this.searchChange}
                        enterButton/>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/>
                <List
                    dataSource={this.state.showOrders}  //this.state.showorders gives back list of all orders
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                //left side of the screen constructed by this
                                title={'order:' + item.listId}  //gives the order number
                                description={'user:'+item.userId+'    time:' + item.time}   //gives the time of the purchase
                            />
                            {/* right side of the screen constructed by this*/}
                            {/* gives back the specific order detail(what book is brought, how many, price , etc.*/}
                            {/* a order may have multiple items, so we are sending it all in*/}
                            <OrderDetail info={item.items}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default OrderTable;
