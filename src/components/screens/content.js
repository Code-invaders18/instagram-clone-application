import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

const { Meta } = Card;

const Content=({url})=>{
    console.log(url)
    return(
        <div>   
           {
               url.map(i=>{
                   return(
                    <Card
                        className="storycard"
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={i}/>}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                   )
               })
           }
        </div>
    );
}
export default Content;