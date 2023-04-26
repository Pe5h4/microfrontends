import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MaterketingApp from './components/MarketingApp';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

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
					<MaterketingApp />
				</div>
			</StylesProvider>
		</BrowserRouter>
	)
};
