import React, { lazy, Suspense } from 'react';
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
	return(
		<BrowserRouter>
			<StylesProvider generateClassName={generateClassName}>
				<div>
					<Header />
					<Suspense fallback={<Progress />}>
					<Switch>
						<Route path="/auth" component={AuthApp} />
						<Route path="/" component={MarketingApp} />
					</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</BrowserRouter>
	)
};
