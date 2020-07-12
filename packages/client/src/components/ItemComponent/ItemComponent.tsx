import React from 'react';
import './ItemComponent.css';
import {Card} from 'antd';
import {COLORS} from "../../models/model-colors";

const ItemComponent: React.FC<{ name: string, classification: string, types: string[] }> = ({name = "No name", classification = '', types = []}) => {
	const firstTypeName: string = types.length > 0 ? types[0] : 'Normal';
	const secondTypeName: string = types.length > 1 ? types[1] : firstTypeName;
	const color0 = COLORS[firstTypeName];
	const color1 = COLORS[secondTypeName];
	return (
		<Card title={<>
			<span className={'card-background'}
				  style={{background: `linear-gradient(90deg, ${color0.rgba} 50%, ${color1.rgba} 50%)`}}
			/>
			<span>{name}</span>
		</>} className={'pokemon-card'}>
			<p className={'pokemon-type'}>
				{
					types.map((item, index) => {
						const color = index ? color1 : color0;
						return (
							<span style={{color: `${color.rgb}`}}>{item}</span>
						)
					})
				}
			</p>
			<p className={'pokemon-classification'}>{classification}</p>
		</Card>
	);
}

export default ItemComponent;
