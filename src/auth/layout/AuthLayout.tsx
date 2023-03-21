import { Container } from 'semantic-ui-react';

import { AuthRoutes } from '../routes';
import './authLayout.scss';

export const AuthLayout = () => {
	return (

		<Container fluid className='auth'>

			<AuthRoutes />

		</Container>

	);
};