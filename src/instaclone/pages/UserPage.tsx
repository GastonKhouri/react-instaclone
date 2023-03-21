import { Grid, Image } from 'semantic-ui-react';

import { useUserPage } from '../../hooks';
import { Followers, ModalBasic, ProfileHeader, Publications } from '../components';
import { UserNotFoundPage } from './UserNotFoundPage';

import './userPage.scss';

export const UserPage = () => {

	const {
		authUser,
		userData,
		publicationsData,
		handleModal,
		isError,
		isLoading,
		isSameUser,

	} = useUserPage();

	if ( isLoading ) return <></>;
	if ( isError ) return <UserNotFoundPage />;

	const { getUser: user } = userData!;
	const { getPublications: publications } = publicationsData!;

	return (
		<>
			<Grid className="profile">
				<Grid.Column width={ 5 } className="profile__left">
					<Image
						src={ user.avatar ? user.avatar : '/assets/png/avatar.png' }
						avatar
						onClick={ () => isSameUser && handleModal( 'avatar' ) }
					/>
				</Grid.Column>
				<Grid.Column width={ 11 } className="profile__right">
					<ProfileHeader
						user={ user }
						authUser={ authUser }
						handleModal={ handleModal }
					/>
					<Followers
						username={ user.username! }
						totalPublications={ publications.length }
					/>
					<div className="other">
						<p className="name">{ user.name }</p>
						{
							user.website
							&& (
								<a
									href={ user.website }
									className="website"
									target="_blank"
									rel="noopener noreferrer"
								>
									{ user.website }
								</a>
							)
						}
						{
							user.description
							&& (
								<p className="description">{ user.description }</p>
							)
						}
					</div>
				</Grid.Column>
			</Grid>
			<ModalBasic />
			<Publications publications={ publications } />
		</>
	);
};
