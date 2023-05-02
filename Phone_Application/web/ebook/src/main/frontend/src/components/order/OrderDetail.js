import React from 'react';
import { Table } from 'antd';

class OrderDetail extends React.Component {

    render() {

        const {info} = this.props;  //set info to the order being sent in (if an order has multiple items, it will be an array with that many elements)

        if (info == null) {
            return null;
        }

        for (let i = 0; i < info.length; ++i) {
            info[i].title = info[i].book.title;
            info[i].sum = (info[i].bookNumber*info[i].bookPrice).toFixed(1);
        }

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Number',
                dataIndex: 'bookNumber',
                key: 'bookNumber',
            },
            {
                title: 'Price/per',
                dataIndex: 'bookPrice',
                key: 'bookPrice',
            },
            {
                title: 'Sum',
                dataIndex: 'sum',
                key: 'sum',
            },
        ];
        //construct table, columns first and corresponding values under it
        //columns include "title," "number," "price/per," "sum"
        return <Table columns={columns} dataSource={info} />;
    }
}
export default OrderDetail;
