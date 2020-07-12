import React from 'react';
import './ListComponent.css';
import {List} from 'antd';
import ItemComponent from "../ItemComponent/ItemComponent";

// Layout grid configuration
const gridConfig = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6,
};

const ListComponent: React.FC<{data: {name: string, classification: string, types: string[]}[]}> = ({data = []}) => (
    <List
        grid={gridConfig}
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <ItemComponent name={item.name} classification={item.classification} types={item.types}/>
            </List.Item>
        )}
    />
);

export default ListComponent;



