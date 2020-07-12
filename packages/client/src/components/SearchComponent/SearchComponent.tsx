import React, {useState} from 'react';
import './SearchComponent.css';
import {Input, Select} from 'antd';
import {useDispatch} from "react-redux";
import {changeFilter, doSearch} from "../../redux/actions";
import {PokemonType} from "../../models/model-pockemon";
import {LeftOutlined} from "@ant-design/icons/lib";

const {Search} = Input;

const SearchComponent: React.FC<{ pokemonTypes: PokemonType[] }> = ({pokemonTypes = []}) => {
	const dispatch = useDispatch();

	// Handler to update filter type
	const [filter, setFilter] = useState('');

	// Broadcast search event
	const onSearch = (value: string) => {
		console.log(value);
		dispatch(doSearch(value))
	}

	// Update UI based on filter type, broadcast chosen filter
	const onChangeFilter = (value: string) => {
		console.log(`SearchComponent switch filter to ${value}`);
		setFilter(`${value}`);
		if (value) {
			dispatch(changeFilter(value));
		}
	}

	// Update UI clearing filter type
	const onBack = () => {
		setFilter('')
	}

	return (
		<div className={`component-search filter-${filter}`}>
			<div className={'filter-criteria'}>
				<Select value={filter} onChange={onChangeFilter}>
					<Select.Option value="" disabled>Choose criteria</Select.Option>
					<Select.Option value="name">Name</Select.Option>
					<Select.Option value="type">Type</Select.Option>
				</Select>
			</div>
			<div className={'filter-by-name'}>
				<LeftOutlined className={'filter-back'} onClick={onBack}/>
				<Search placeholder="Search by name" onSearch={onSearch} enterButton/>
			</div>
			<div className={'filter-by-type'}>
				<LeftOutlined className={'filter-back'} onClick={onBack}/>
				<Select
					defaultValue=""
					showSearch
					optionFilterProp="children"
					onChange={onSearch}
					filterOption={(input, option) =>
						option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					<Select.Option value={''}>Select a type</Select.Option>
					{
						pokemonTypes.map((item, index) => (
							<Select.Option key={index} value={item.name}>{item.name}</Select.Option>
						))
					}
				</Select>
			</div>
		</div>
	);
}

export default SearchComponent;
