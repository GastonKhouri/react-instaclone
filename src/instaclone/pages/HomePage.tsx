import { Grid } from 'semantic-ui-react';

import { Feed, UsersNotFollowed } from '../components';

import './homePage.scss';

export const HomePage = () => {
	return (
		<Grid className="home">
			<Grid.Column className="home__left" width={ 11 }>
				<Feed />
			</Grid.Column>
			<Grid.Column className="home__right" width={ 5 }>
				<UsersNotFollowed />
			</Grid.Column>
		</Grid>
	);
};
