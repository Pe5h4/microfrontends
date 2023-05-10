import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

// mount is just a referrence to a react element, we should not export react elements since there will be complications when container uses a different framework


// Can use this pattern in almost any framework
export default () => {

	const ref = useRef(null);


	// take a reference of dashboard app and put it to div
	useEffect(() => {
		mount(ref.current);
	}, [])

	return <div ref={ref}/>;

}
