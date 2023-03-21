import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'semantic-ui-react';

import { FOLLOW_USER, IS_FOLLOWING, UNFOLLOW_USER } from '../../../gql/follow';
import { IsFollowingQuery, User } from '../../../interfaces';

import './profileHeader.scss';

interface Props {
	user: User;
	authUser: User | null;
	handleModal: ( type: "avatar" | "settings" ) => void;
}

export const ProfileHeader = ( { user, authUser, handleModal }: Props ) => {

	const [ followUser ] = useMutation( FOLLOW_USER );
	const [ unfollowUser ] = useMutation( UNFOLLOW_USER );

	const { data, loading, refetch } = useQuery<IsFollowingQuery>( IS_FOLLOWING, {
		variables: {
			username: user.username
		}
	} );

	const followButton = () => {

		if ( data?.isFollowing ) {
			return (
				<Button onClick={ onUnfollow } className="btn-danger">
					Dejar de seguir
				</Button>
			);
		}

		return (
			<Button onClick={ onFollow } className="btn-action">
				Seguir
			</Button>
		);

	};

	const checkAuthUser = () => {

		if ( authUser?.username === user?.username ) {
			return (
				<Button onClick={ () => handleModal( 'settings' ) }>
					Ajustes
				</Button>
			);
		}

		return (
			!loading && followButton()
		);

	};

	const onFollow = async () => {

		try {

			await followUser( {
				variables: {
					username: user.username
				}
			} );

			refetch();

		} catch ( error ) {
			console.log( error );
		}

	};

	const onUnfollow = async () => {

		try {

			await unfollowUser( {
				variables: {
					username: user.username
				}
			} );

			refetch();

		} catch ( error ) {
			console.log( error );
		}

	};

	return (
		<div className="profile-header">
			<h2>{ user.username }</h2>
			{
				authUser
					? checkAuthUser()
					: <></>
			}
		</div>
	);
};
