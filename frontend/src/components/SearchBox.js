import React from 'react';
import { Button } from 'react-bootstrap';

const SearchBox = ({ onIconClick }) => {
	return (
		<Button>
			<span onClick={onIconClick}>
				<i className="fa-solid fa-magnifying-glass"></i>
			</span>
		</Button>
	);
};

export default SearchBox;
