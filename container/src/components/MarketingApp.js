import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

/*MarketingApp is a name of exposed file in the webpack config of marketing

exposes: { // Exposes the file for sharing
	'./MarketingApp': './src/bootstrap'
}

*/

// mount is just a referrence to a react element, we should not export react elements since there will be complications when container uses a different framework


// Can use this pattern in almost any framework
export default () => {

	const ref = useRef(null);

	// take a reference of marketing app and put it to div
	useEffect(() => {
		mount(ref.current);
	})

	return <div ref={ref}/>;

}
