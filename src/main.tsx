import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { InstacloneApp } from './InstacloneApp';

import 'semantic-ui-css/semantic.min.css';
import './scss/index.scss';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<BrowserRouter>
		<InstacloneApp />
	</BrowserRouter>
);
