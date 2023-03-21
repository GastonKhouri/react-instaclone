import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/auth';
import { UiContext } from '../contexts/ui';
import { POST_COMMENT } from '../gql/comment';

interface PasswordForm {
	oldPassword: string;
	newPassword: string;
	newPassword2: string;
}

interface DescriptionForm {
	description: string;
}

interface EmailForm {
	email: string;
}

interface WebsiteForm {
	website: string;
}

interface CommentForm {
	comment: string;
	publication: string;
}

export const useSubmitForms = () => {

	const { updateUserAsync, user, updateUserSync } = useContext( AuthContext );
	const { onCloseModal } = useContext( UiContext );

	const [ postComment ] = useMutation( POST_COMMENT );

	const onSubmitPasswordForm = async ( values: PasswordForm ) => {

		const { newPassword2, ...rest } = values;

		const { ok, errorMessage } = await updateUserAsync( rest );

		if ( !ok ) {
			toast.error( errorMessage ? errorMessage : 'Error al actualizar la contraseña.' );
			return;
		}

		toast.success( 'Contraseña actualizada correctamente.' );

		onCloseModal();

	};

	const onSubmitDescriptionForm = async ( values: DescriptionForm ) => {

		const { ok, errorMessage } = await updateUserAsync( values );

		if ( !ok ) {
			toast.error( errorMessage ? errorMessage : 'Error al actualizar la descripción.' );
			return;
		}

		updateUserSync( values );

		toast.success( 'Descripción actualizada correctamente.' );

		onCloseModal();

	};

	const onSubmitEmailForm = async ( values: EmailForm ) => {

		if ( values.email === user?.email ) {
			toast.error( 'Debe cambiar el correo electrónico.' );
			return;
		}

		const { ok, errorMessage } = await updateUserAsync( values );

		if ( !ok ) {
			toast.error( errorMessage ? errorMessage : 'Error al actualizar el correo electrónico.' );
			return;
		}

		updateUserSync( values );

		toast.success( 'Correo electrónico actualizado correctamente.' );

		onCloseModal();

	};

	const onSubmitWebsiteForm = async ( values: WebsiteForm ) => {

		const { ok, errorMessage } = await updateUserAsync( values );

		if ( !ok ) {
			toast.error( errorMessage ? errorMessage : 'Error al actualizar el sitio web.' );
			return;
		}

		updateUserSync( values );

		toast.success( 'Sitio web actualizado correctamente.' );

		onCloseModal();

	};

	const onSubmitCommentForm = async ( values: CommentForm ) => {

		try {

			const { data } = await postComment( {
				variables: {
					input: values
				}
			} );

			if ( !data ) {
				return false;
			};

			return true;

		} catch ( error: any ) {
			toast.error( error.message );
			return false;
		}

	};

	return {
		onSubmitPasswordForm,
		onSubmitDescriptionForm,
		onSubmitEmailForm,
		onSubmitWebsiteForm,
		onSubmitCommentForm
	};

};
