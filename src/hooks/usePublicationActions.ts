import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { POST_LIKE, DELETE_LIKE, GET_LIKES, IS_LIKED } from '../gql/like';

export const usePublicationActions = ( publicationId = '' ) => {

	const [ isLoadingAction, setIsLoadingAction ] = useState( false );

	const [ postLike ] = useMutation( POST_LIKE );
	const [ deleteLike ] = useMutation( DELETE_LIKE );

	const {
		data: getLikesData,
		loading: getLikesLoading,
		refetch: getLikesRefetch
	} = useQuery( GET_LIKES, {
		variables: {
			publication: publicationId
		}
	} );

	const {
		data: isLikedData,
		loading: isLikedLoading,
		refetch: isLikedRefetch
	} = useQuery( IS_LIKED, {
		variables: {
			publication: publicationId
		}
	} );

	useEffect( () => {
		getLikesRefetch();
	}, [] );

	const onAddLike = async () => {

		setIsLoadingAction( true );

		try {
			await postLike( {
				variables: {
					publication: publicationId
				}
			} );

			await Promise.all( [
				isLikedRefetch(),
				getLikesRefetch()
			] );
		} catch ( error ) {
			console.log( error );
		}

		setIsLoadingAction( false );

	};

	const onDeleteLike = async () => {

		setIsLoadingAction( true );

		try {
			await deleteLike( {
				variables: {
					publication: publicationId
				}
			} );

			await Promise.all( [
				isLikedRefetch(),
				getLikesRefetch()
			] );
		} catch ( error ) {
			console.log( error );
		}

		setIsLoadingAction( false );

	};

	return {
		getLikesLoading,
		isLikedLoading,
		getLikesData,
		isLikedData,
		onDeleteLike,
		onAddLike,
		isLoadingAction
	};

};
