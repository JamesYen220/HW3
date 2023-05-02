import React from 'react';
import {Carousel} from 'antd';

export class BookCarousel extends React.Component {

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx); //passes in images (4 in our case)
        console.log("testBookCarosel");console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
    //        result.push(<div><img alt={i} src={img}/></div>);
            result.push(
                <img key={i.toString()}
                     alt={i}
                     src={img}/>
            );
        }
        console.log("endBookCarosel");console.log(images);
        return result;
    };

    render() {

        const requireContext = require.context("../../assets/carousel", true, /^\.\/.*\.jpg$/);

        return (
            <Carousel autoplay>
                {this.createContent(requireContext)}
            </Carousel>
        )
    }
}


