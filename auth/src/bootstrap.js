import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history'; // Create copy of memory history
// Mount function to strart up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
	// Create initial path with some initialPath default to avoid state mismatch on routing
	const history = defaultHistory || createMemoryHistory({
		initialEntries: [initialPath]
	}); // Default history will be called only when present, otherwise we will use memoryhistory

	if (onNavigate) {
		history.listen(onNavigate); // It will trigger onNavigate on callback whenever the path changes
	}
	

	ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

	// Communication between parent and child components on navigation
	return {
		onParentNavigate({ pathname: nextPathname }){
			const {pathname} = history.location;
			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		}
	}
};

// If we are in the development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
	const devRoot = document.querySelector("#_auth-dev-root");
	// browser history will be called in isolation, memory history will be used if we are not in isolation
	if (devRoot) {
		mount(devRoot, { defaultHistory: createBrowserHistory() });
	}
}

// We are running htrough contaner and we should export the mount function
export { mount };
