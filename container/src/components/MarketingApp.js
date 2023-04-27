import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/*MarketingApp is a name of exposed file in the webpack config of marketing

exposes: { // Exposes the file for sharing
	'./MarketingApp': './src/bootstrap'
}

*/

// mount is just a referrence to a react element, we should not export react elements since there will be complications when container uses a different framework


// Can use this pattern in almost any framework
export default () => {

	const ref = useRef(null);
	const history = useHistory(); // Copy of the browser history

	// take a reference of marketing app and put it to div
	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			// nextPathname represent the path navigation is attempted to navigate to
			onNavigate: ({pathname: nextPathname}) => {
				// Prevent infinite flow
				const { pathname } = history.location; // Current path
				if (pathname !== nextPathname) {
					// navigate to a new path
					history.push(nextPathname);	
				}
			},
		});
		history.listen(onParentNavigate); // if there is any call to our router, use onParentNAvigate function
	}, [])

	return <div ref={ref}/>;

}
