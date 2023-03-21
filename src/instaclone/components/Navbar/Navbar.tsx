import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { SearchUsers, NavbarOptions } from '../';

import './navbar.scss';

export const Navbar = () => {

	return (
		<div className="header">
			<Container >
				<Grid>
					{/* Logo */ }
					<Grid.Column width={ 3 } className="header__logo">
						<Link to='/'>
							<Image src='/assets/png/instaclone.png' alt="instaclone" />
						</Link>
					</Grid.Column>

					{/* Search */ }
					<Grid.Column width={ 10 }>
						<SearchUsers />
					</Grid.Column>

					{/* Options */ }
					<Grid.Column width={ 3 }>
						<NavbarOptions />
					</Grid.Column>
				</Grid>
			</Container>
		</div>
	);
};
