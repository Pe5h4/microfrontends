import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Lazily load the code
const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));


// It generates the classname for production to avoid css classname collision
const generateClassName = createGenerateClassName({
	productionPrefix: 'co'
})

export default () => {

	const [userInfo, setUserInfo] = useState(false); // In our case this should be a undefined/object

	return(
		<BrowserRouter>
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
						<Route path="/" component={MarketingApp} />
					</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</BrowserRouter>
	)
};
