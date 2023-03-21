import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/auth';
import { UiContext } from '../contexts/ui';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../gql/user';
import { DeleteAvatarMutation, GetUserQuery, UpdateAvatarMutation } from '../interfaces';

export const useUpdateAvatar = () => {

	const { onCloseModal } = useContext( UiContext );
	const { user, updateUserSync } = useContext( AuthContext );

	const [ updateAvatar, { loading: uploadingAvatar } ] = useMutation( UPDATE_AVATAR, {
		update( cache, { data: { updateAvatar } } ) {
			const { getUser } = cache.readQuery( {
				query: GET_USER,
				variables: { username: user!.username }
			} ) as GetUserQuery;

			cache.writeQuery( {
				query: GET_USER,
				variables: { username: user!.username },
				data: { getUser: { ...getUser, avatar: updateAvatar.avatarUrl } }
			} );
		}
	} );

	const [ deleteAvatar ] = useMutation( DELETE_AVATAR, {
		update( cache ) {
			const { getUser } = cache.readQuery( {
				query: GET_USER,
				variables: { username: user!.username }
			} ) as GetUserQuery;

			cache.writeQuery( {
				query: GET_USER,
				variables: { username: user!.username },
				data: { getUser: { ...getUser, avatar: "" } }
			} );
		}
	} );

	const onDeleteAvatar = async () => {

		try {

			const { data } = await deleteAvatar();

			if ( !data ) return;

			const { deleteAvatar: resp } = data;

			if ( !resp ) {
				toast.error( 'Error al eliminar el avatar.' );
				return;
			}

			updateUserSync( { avatar: undefined } );

			onCloseModal();

		} catch ( error ) {
			console.log( error );
		}

	};

	const onDrop = useCallback(
		async ( acceptedFiles: File[] ) => {

			const file = acceptedFiles[ 0 ];

			try {

				const { data } = await updateAvatar( {
					variables: { file }
				} );

				if ( !data ) return;

				const { updateAvatar: { avatarUrl, status } } = data;

				if ( !status ) {
					toast.error( 'Error al actualizar el avatar.' );
					return;
				}

				updateUserSync( { avatar: avatarUrl } );

				onCloseModal();

			} catch ( error ) {
				console.log( error );
			}

		},
		[],
	);

	const { getRootProps, getInputProps } = useDropzone( {
		accept: {
			'image/png': [ '.png' ],
			'image/jpeg': [ '.jpeg' ],
			'image/jpg': [ '.jpg' ],
		},
		multiple: false,
		noKeyboard: true,
		onDrop
	} );

	return {
		getRootProps,
		uploadingAvatar,
		onCloseModal,
		getInputProps,
		onDeleteAvatar
	};

};
