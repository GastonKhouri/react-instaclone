import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { UiContext } from '../contexts/ui';
import { UserList } from '../instaclone/components';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../gql/follow';
import { GetFollowersQuery, GetFollowingQuery, User } from '../interfaces';

export const useFollowers = ( username: string ) => {

	const { onOpenModal, onSetModalChildren, onSetModalTitle } = useContext( UiContext );

	const {
		data: followersData,
		loading: followersLoading,
		startPolling: followersStartPolling,
		stopPolling: followersStopPolling
	} = useQuery<GetFollowersQuery>( GET_FOLLOWERS, {
		variables: { username }
	} );

	const {
		data: followingData,
		loading: followingLoading,
		startPolling: followingStartPolling,
		stopPolling: followingStopPolling
	} = useQuery<GetFollowingQuery>( GET_FOLLOWING, {
		variables: { username }
	} );

	useEffect( () => {
		followersStartPolling( 1000 );

		return () => {
			followersStopPolling();
		};
	}, [] );

	useEffect( () => {
		followingStartPolling( 1000 );

		return () => {
			followingStopPolling();
		};
	}, [] );

	const handleModal = ( type: 'followers' | 'following', users: User[] ) => {

		switch ( type ) {
			case "followers":
				onSetModalTitle( "Seguidores" );
				onSetModalChildren( <UserList users={ users } /> );
				onOpenModal();
				break;

			case "following":
				onSetModalTitle( "Siguiendo" );
				onSetModalChildren( <UserList users={ users } /> );
				onOpenModal();
				break;

			default:
				break;
		}

	};

	return {
		handleModal,
		followingLoading,
		followersLoading,
		followersData,
		followingData,
	};

};
