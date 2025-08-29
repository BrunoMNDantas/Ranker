import React from 'react';
import { useParams } from 'react-router-dom';

const OptionPage = () => {
	const { optionId } = useParams<{ optionId: string }>();

	return (
		<div>
			Option Page {optionId}
		</div>
	);
}

export default OptionPage;