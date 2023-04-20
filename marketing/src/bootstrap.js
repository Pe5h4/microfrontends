import React from 'react';
import ReactDOM from 'react-dom';

// Mount function to strart up the app
const mount = (el) => {
	ReactDOM.render(
		<h1>Hi there!</h1>,
		el
	);
};

// If we are in the development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
	const devRoot = document.querySelector("#_marketing-dev-root");

	if (devRoot) {
		mount(devRoot);
	}
}

// We are running htrough contaner and we should export the mount function
export { mount };
