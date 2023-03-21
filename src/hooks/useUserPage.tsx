import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';
import { UiContext } from '../contexts/ui';
import { GET_USER } from '../gql/user';
import { GetUserQuery } from '../interfaces';
import { AvatarForm, SettingsForm } from '../instaclone/components';
import { GetPublicationsQuery } from '../interfaces/queries';
import { GET_PUBLICATIONS } from '../gql/publication';

type RouteParams = {
	username: string;
};

export const useUserPage = () => {

	const { username } = useParams<RouteParams>();

	const { user: authUser } = useContext( AuthContext );
	const { onOpenModal, onSetModalChildren, onSetModalTitle } = useContext( UiContext );

	const {
		data: userData,
		loading: loadingUser,
		error: errorUser,
		refetch: refetchUser
	} = useQuery<GetUserQuery>( GET_USER, {
		variables: {
			username
		}
	} );

	const {
		data: publicationsData,
		loading: loadingPublications,
		error: errorPublications,
		startPolling: startPollingPublications,
		stopPolling: stopPollingPublications
	} = useQuery<GetPublicationsQuery>( GET_PUBLICATIONS, {
		variables: {
			username
		}
	} );

	useEffect( () => {
		startPollingPublications( 1000 * 60 * 5 );

		return () => {
			stopPollingPublications();
		};
	}, [] );


	const isSameUser = authUser?.username === username;
	const isLoading = loadingUser || loadingPublications;
	const isError = errorUser || errorPublications;

	const handleModal = ( type: 'avatar' | 'settings' ) => {
		switch ( type ) {
			case "avatar":
				onSetModalTitle( "Cambiar foto de perfil." );
				onSetModalChildren( <AvatarForm /> );
				onOpenModal();
				break;

			case "settings":
				onSetModalChildren( <SettingsForm refetchUser={ refetchUser } /> );
				onOpenModal();
				break;

			default:
				break;
		}
	};

	return {
		isLoading,
		isError,
		isSameUser,

		userData,
		publicationsData,

		authUser,

		handleModal,
	};

};
