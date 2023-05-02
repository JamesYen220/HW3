import React, {useState, useEffect} from 'react'
import {List, Input} from 'antd'
import {Book} from './Book'
import {getBooks} from "../../services/bookService";


const {Search} = Input;

export class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showBooks: [], //this.state.showbook:Array(0) initially
            searchValue: '',
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({books: data, showBooks: data});
        };

        getBooks({"search": null}, callback); //goes to bookservice.js and routes.js to retrieve data from localhost8080
        this.render();  //renders data

    }

    //triggers when you type something in homepage search bar
    //value = input
    //list.length = 28 books
    searchChange = ({target: {value}}) => {
        this.setState({searchValue: value})
        let arr = [];
        let list = this.state.books;    //list becomes array of books
        let search = value;     //search=value=input

        //loop through books and put correct match into arr
        for (let i = 0; i < list.length; i++) {
            if (list[i].title.indexOf(search) >= 0) {
                arr.push(list[i]);
            }
        }
        //arr = array of elements of matching results
        this.setState(
            {showBooks: arr}
        );
    }

    render() {
        return (
            <div>
                <Search value={this.state.searchValue}  //search bar
                        placeholder="Search for books"
                        onChange={this.searchChange}
                        enterButton
                        allowClear
                />
                <br/>
                <br/>
                <List
                    grid={{gutter: 10, column: 3}} //3 books in one row
                    dataSource={this.state.showBooks} // return the data and display
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 16,       // 16 books in a page
                    }}

                    renderItem={item => (
                        <List.Item> {/*displays books based on parameters of how many books on a page*/}
                            <Book info={item}/> {/*all the books(defined in book.js) are items */}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}