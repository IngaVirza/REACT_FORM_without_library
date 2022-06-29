import React from 'react';

const Message = (props) => {
	return (
		<div>
			<p>{props.message}</p>
			<span
				onClick={()=>props.close()}>
				X</span>
		</div>
	);
};

export default Message;