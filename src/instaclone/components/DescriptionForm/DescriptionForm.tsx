import { useContext } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { useFormik } from 'formik';

import { AuthContext } from '../../../contexts/auth';
import { useSubmitForms } from '../../../hooks';

import './descriptionForm.scss';

interface Props {
	refetchUser: () => void;
}

export const DescriptionForm = ( { refetchUser }: Props ) => {

	const { onSubmitDescriptionForm } = useSubmitForms();

	const { user } = useContext( AuthContext );

	const { handleSubmit, values, handleChange, isValid } = useFormik( {
		initialValues: {
			description: user?.description || '',
		},
		onSubmit: async ( values ) => {
			await onSubmitDescriptionForm( values );
			refetchUser();
		}
	} );

	return (
		<Form className="description-form" onSubmit={ handleSubmit }>

			<TextArea
				placeholder="Biografía"
				name="description"
				value={ values.description }
				onChange={ handleChange }
			/>

			<Button
				type="submit"
				className="btn-submit"
				disabled={ !isValid }
			>
				Actualizar
			</Button>

		</Form>
	);
};
