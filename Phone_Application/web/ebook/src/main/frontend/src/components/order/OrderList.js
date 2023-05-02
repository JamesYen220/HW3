import React from 'react';
import {DatePicker,Input, List, message} from 'antd'
import {getOrders} from "../../services/userService";
import OrderDetail from "./OrderDetail";

const {Search} = Input;

const { RangePicker } = DatePicker;

export class OrderList extends React.Component {

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
            let tmp =[];
           for(let i = data.length-1;i>=0;i--)  //loop thru array of all orders made by the user
            {
                tmp.push(data[i]);  //put all orders into tmp
            }
            this.setState({orders: tmp, showOrders: tmp});  //set state with tmp array
        };

        let user = JSON.parse(localStorage.getItem('user'));    //get user from local storage

        if (user === null) {
            message.error("请登录");
        } else {
            let userId = user.userId;
            getOrders(userId, callback);    //get order based on id
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
                list[i].listId.toString() === search.toString()
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
        this.setState(
            {showOrders: arr}   //set state to all matching results (array arr)
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
                <br/>
                <Search value={this.state.searchValue} placeholder="search for orders" onChange={this.searchChange}
                        enterButton/>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/>
                <List
                        dataSource={this.state.showOrders} //this.state.showorders gives back list of all orders
                     renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                //left side of the screen constructed by this
                                title={'order:' + item.listId}  //gives the order number
                                description={'time:' + item.time}   //gives the time of the purchase
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
