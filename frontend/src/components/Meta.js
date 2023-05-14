import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To Clerspecs',
	description: 'We sell the best spectacles for affordable prices',
	keywords: 'spectacles, buy spectacles, sunglasses, buy sunglasses',
};

export default Meta;
