import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/*AuthApp is a name of exposed file in the webpack config of auth

exposes: { // Exposes the file for sharing
	'./AuthApp': './src/bootstrap'
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
			initialPath: history.location.pathname, // Initial path of the container propagated to bootstrap mount of Auth app
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
