import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to strart up the app
const mount = (el) => {
	const app = createApp(Dashboard);
	app.mount(el); // This mount is related to Vue (it is not our custom mount function) to show component inside DOM
};

// If we are in the development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
	const devRoot = document.querySelector("#_dashboard-dev-root");
	// browser history will be called in isolation, memory history will be used if we are not in isolation
	if (devRoot) {
		mount(devRoot);
	}
}

// We are running htrough contaner and we should export the mount function
export { mount };
