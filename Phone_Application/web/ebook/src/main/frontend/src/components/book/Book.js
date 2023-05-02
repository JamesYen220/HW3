import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom'

const {Meta} = Card;

export class Book extends React.Component {
    render() {
        const {info} = this.props;
        return (
            <Link to={{ /* when you click on a specific book, a link will redirect you to detailed book info page */
                pathname: '/book',
                search: '?id=' + info.bookId /* bookID includes name, description, price, and img*/
            }}
            >
                <Card /* imported from antd*/
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="bookFace" src={info.image}/>}>
                    <Meta title={info.title}
                          description={'¥' + info.price}/>
                </Card>
            </Link>
        );
    }
}
