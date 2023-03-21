import { Container } from 'semantic-ui-react';
import { Navbar } from '../components';

import { InstacloneRoutes } from '../routes';

import './instacloneLayout.scss';

export const InstacloneLayout = () => {
	return (

		<>
			<Navbar />

			<Container className="layout-basic">

				<InstacloneRoutes />

			</Container>
		</>

	);
};
