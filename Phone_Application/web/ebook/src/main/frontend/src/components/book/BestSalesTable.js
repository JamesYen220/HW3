import React from 'react';
import {Button, DatePicker, Input, message, Table} from 'antd'
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {getAllOrders} from "../../services/orderService";

const { RangePicker } = DatePicker;

export class BestSalesTable extends React.Component {

    //https://reactjs.org/docs/react-component.html#constructor
    //The constructor for a React component is called before it is mounted. When implementing the constructor for a React.
    // Component subclass, you should call super(props) before any other statement.
    // Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
    //Constructor is the only place where you should assign this.state directly. In all other methods, you need to use this.setState() instead.
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            data: [],
            showData:[],
            searchText: '',
            searchedColumn: '',
        };
    }
    // https://reactjs.org/docs/react-component.html#componentdidmount
    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    // All the AJAX requests and the DOM or state updation should be coded in the componentDidMount() method block. We can also set up all the major subscriptions here
    // but to avoid any performance issues, always remember to unsubscribe them in the componentWillUnmount() method.
    componentDidMount() {
        // callback = Instead of passing down a piece of the state to a child component, the parent can pass down a callback function.
        // This callback function is run at a later time, usually through some interaction with the child component (this prevents data from locking, causing great delay).
        // The purpose of this callback function is to change a piece of the state that is a part of the parent component. This closes the data loop.
        const callback = (data) => {
            console.log(data);
           // after retrieving all the orders (lines 75) do this next
            let number = new Array(40); //create an array to keep track how many times a book is brought
            let title = new Array(40);  //create an array to keep track the title of the books
            let sum = new Array(40);    //create an array to keep track the sum of the books brought
            let arr =[];    //create an array to store the combined information of the 3 listed above
            for(let index = 0;index < 40;index++){
                number[index] = 0;
                title[index] = '';
                sum[index] = 0;
            }
            //data refers to # of total orders
            for(let i = 0;i <=data.length-1;i++)    //loop through each order
            {
                for(let j = 0;j<=data[i].items.length-1;j++)    //in each order take out items that consists of the order and loop through them one at a time
                {
                    let item = data[i].items[j];    //get the item
                    let book = item.book;   //get the book
                    let bookId = book.bookId;   //get the book id
                    number[bookId] += item.bookNumber;  //keep track of the number of books brought for each book
                    title[bookId]=book.title;   //record the title of the book
                    sum[bookId] += Number((item.bookNumber * item.bookPrice));  //based on how many times a book is brought, calculate the sum
                }
            }
           // debugger;
            for(let index = 0;index < 40;index++){
                if(number[index] !== 0)
                {
                    let json = {bookId:index,title:title[index],bookNumber:number[index],sum:sum[index].toFixed(1)};    //extract the bookid, title, booknumber, and sum into an array
                    arr.push(json)  //push information into an array
                }
            }
            //setState() method to change the state object. It ensures that the component has been updated and calls for re-rendering of the component.
            this.setState({data: arr,showData:arr,orders:data});    //display the information onto the screen (the title of the book, total # of times it's brought, and total sum)
        };
        //comes here first to retrieve orders thru getAllOrders
        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            message.error("请登录");   //if user is null, it means the user isn't logged in
        } else {
             getAllOrders({"search": null}, callback);  //else get orders of all users
        }
    }

    // search property need to be defined on field to be searched.
    getColumnSearchProps = dataIndex => ({
        //Implement a customized column search example via filterDropdown
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    //register change
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}} //resize for beauty purposes
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)} //after you click search
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),

        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,   //search icon

        //filter other results (only show searched)
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },

        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    // handleSearch =  activated when you search for a book
    // selectedKeys = input
    // dataIndex = "title"
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState({showData:this.state.data})
            return;
        }
        console.log('Formatted Selected Time: ', dateString);
        const startTime= new Date(Date.parse(dateString[0]));
        const endTime=new Date(Date.parse(dateString[1]));
        let data = this.state.orders;
        let number = new Array(40);
        let title = new Array(40);
        let sum = new Array(40);
        let arr =[];
        for(let index = 0;index < 40;index++){
            number[index] = 0;
            title[index] = '';
            sum[index] = 0;
        }
        debugger;
        for(let i = 0;i <=data.length-1;i++)
        {
            let time = new Date(Date.parse(data[i].time));
            if (
                time >startTime && time<endTime
            ) {
                for (let j = 0; j <= data[i].items.length - 1; j++) {
                    let item = data[i].items[j];
                    let book = item.book;
                    let bookId = book.bookId;
                    number[bookId]++;
                    title[bookId] = book.title;
                    sum[bookId] += Number((item.bookNumber * item.bookPrice));
                }
            }
        }
        debugger;
        for(let index = 0;index < 40;index++){
            if(number[index] !== 0)
            {
                let json = {bookId:index,title:title[index],bookNumber:number[index],sum:sum[index].toFixed(1)};
                arr.push(json)
            }
        }
        this.setState({
            showData:arr
        })
    }

    render() {
        const columns = [
            {
                title: 'Tilte',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),  //allows searching
            },
            {
                title: 'Number',
                dataIndex: 'bookNumber',
                key: 'bookNumber',
                sorter: (a, b) => a.bookNumber - b.bookNumber,  //allows sorting
            },
            {
                title: 'Sum',
                dataIndex: 'sum',
                key: 'sum',
                sorter: (a, b) => a.sum - b.sum,    //allows sorting
            },
        ];

        return (
            <div>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/> {/*show time change option */}
                <Table bordered columns={columns} dataSource={this.state.showData} /> {/*populate data*/}
            </div>
        );
    }
}
