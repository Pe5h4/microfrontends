import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// It generates the classname for production to avoid css classname collision
const generateClassName = createGenerateClassName({
	productionPrefix: 'ma'
})

// Router will not makes its own history unlike BrowserRouter
export default ({history}) => {
	return <div>
		<StylesProvider generateClassName={generateClassName}>
			<Router history={history}>
				<Switch>
					<Route exact path ="/pricing" component={Pricing} />
					<Route path ="/" component={Landing} />
				</Switch>
			</Router>
		</StylesProvider>
	</div>
};
