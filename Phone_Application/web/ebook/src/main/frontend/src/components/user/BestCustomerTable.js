import React from 'react';
import {Button, DatePicker, Input, message, Table} from 'antd'
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {getAllOrders} from "../../services/orderService";

const { RangePicker } = DatePicker;

export class BestCustomerTable extends React.Component {

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

    componentDidMount() {
        const callback = (data) => {
            // after retrieving all the orders do this next
            console.log(data);
            let number = new Array(40); //create an array to keep track how many times a user brought a book
            let sum = new Array(40); //create an array to keep track the sum of the books brought
            let arr =[];
            for(let index = 0;index < 40;index++){
                number[index] = 0;
                sum[index] = 0;
            }
            //data refers to # of total orders
            for(let i = 0;i <=data.length-1;i++)   //loop through each order
            {
                let userId = data[i].userId;    //find the userid of the user who placed ther order
                for(let j = 0;j<=data[i].items.length-1;j++) //in each order take out items that consists of the order and loop through them one at a time
                {
                    let item = data[i].items[j]; //get the item
                    number[userId] += item.bookNumber; //keep track of the number of books brought for each book
                    sum[userId] += Number((item.bookNumber * item.bookPrice));  //based on how many times a book is brought, calculate the sum
                }
            }
            for(let index = 0;index < 40;index++){
                if(number[index] !== 0)
                {
                    let json = {userId:index,bookNumber:number[index],sum:sum[index].toFixed(1)};   //extract the userid, booknumber, sum
                    arr.push(json) //push information into array
                }
            }
            this.setState({data: arr,showData:arr,orders:data}); //display the information onto the screen (the userid, number of books brought and sum)
        };

        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            message.error("请登录");
        } else {
            getAllOrders({"search": null}, callback);
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

        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>, //search icon

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
                title: 'userId',
                dataIndex: 'userId',
                key: 'userId',
                ...this.getColumnSearchProps('userId'),  //allows searching
            },
            {
                title: 'Number',
                dataIndex: 'bookNumber',
                key: 'bookNumber',
                sorter: (a, b) => a.bookNumber - b.bookNumber, //allows sorting
            },
            {
                title: 'Sum',
                dataIndex: 'sum',
                key: 'sum',
                sorter: (a, b) => a.sum - b.sum,  //allows sorting
            },
        ];

        return (
            <div>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/>  {/*show time change option */}
                <Table bordered columns={columns} dataSource={this.state.showData} />  {/*populate data*/}
            </div>
        );
    }
}
