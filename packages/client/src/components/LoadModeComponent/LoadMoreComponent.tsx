import React, {useRef} from 'react';
import './LoadModeComponent.css';
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {loadMore} from "../../redux/actions";

const LoadMoreComponent: React.FC<{ showLoadMore: boolean, lastItem: string }> = ({showLoadMore = true, lastItem}) => {
	const dispatch = useDispatch();

	// Broadcast loadMore event
	const onLoadMore = () => {
		console.log("LoadMoreComponent", lastItem);
		container.current?.classList.remove("show-button");
		dispatch(loadMore(lastItem))
	};

	// Set reference to component container to handle UI changes
	const container = useRef<HTMLDivElement>(null);

	console.log(`LoadMoreComponent { showLoadMore: ${showLoadMore}, lastItem: ${lastItem} }`);

	return (
		<div className={'component-load-more ' + (showLoadMore ? 'show-button' : '')} ref={container}>
			<Button type="primary" onClick={onLoadMore}>Load more</Button>
		</div>
	)
}

export default LoadMoreComponent;
