import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

// Lazily load the code
const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));


// It generates the classname for production to avoid css classname collision
const generateClassName = createGenerateClassName({
	productionPrefix: 'co'
})

const history = createBrowserHistory(); // Creating history manually (related to REACT router DOM)

export default () => {

	const [userInfo, setUserInfo] = useState(false); // In our case this should be a undefined/object

	useEffect(() => {
		// If user signed in, redirect
		if (userInfo) {
			history.push('/dashboard');
		}
	}, [userInfo]);

	return(
		<Router history={history}>
			<StylesProvider generateClassName={generateClassName}>
				<div>
					{/*consuming userInfo in header*/}
					<Header userInfo={userInfo} onSignOut={() => setUserInfo(false)} />
					<Suspense fallback={<Progress />}>
					<Switch>
						<Route path="/auth">
							{/*consuming userInfo in Auth app*/}
							<AuthApp userInfo={() => setUserInfo(true)}/>
						</Route>
						<Route path="/dashboard" >
							{/* If user is not logged in, redirect to landing page */}
							{!userInfo && <Redirect to="/" />}
							<DashboardApp />
						</Route>
						<Route path="/" component={MarketingApp} />
					</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</Router>
	)
};
