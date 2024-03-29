import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

// It generates the classname for production to avoid css classname collision
const generateClassName = createGenerateClassName({
	productionPrefix: 'au'
})

const defaultPath = "/auth/signin";

// Router will not makes its own history unlike BrowserRouter
export default ({history, onSignIn}) => {
	return <div>
		<StylesProvider generateClassName={generateClassName}>
			<Router history={history}>
				<Switch>
					<Route path="/auth/signin">
						<Signin onSignIn={onSignIn} />
					</Route>
					<Route path="/auth/signup">
						<Signup onSignIn={onSignIn} />
					</Route>
				</Switch>
			</Router>
		</StylesProvider>
	</div>
};
