import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MaterketingApp from './components/MarketingApp';
import Header from './components/Header';

export default () => {
	return(
		<BrowserRouter>
		<div>
			<Header />
			<MaterketingApp />
		</div>
		</BrowserRouter>
	)
};
