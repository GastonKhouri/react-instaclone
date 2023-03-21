import { useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';

import { AuthContext } from '../../../contexts/auth';
import { useSubmitForms } from '../../../hooks';

import './websiteForm.scss';

interface Props {
	refetchUser: () => void;
}

export const WebsiteForm = ( { refetchUser }: Props ) => {

	const { onSubmitWebsiteForm } = useSubmitForms();

	const { user } = useContext( AuthContext );

	const { handleSubmit, values, handleChange, isValid } = useFormik( {
		initialValues: {
			website: user?.website || '',
		},
		onSubmit: async ( values ) => {
			await onSubmitWebsiteForm( values );
			refetchUser();
		}
	} );

	return (
		<Form className="website-form" onSubmit={ handleSubmit }>

			<Form.Input
				placeholder="Sitio web"
				name="website"
				value={ values.website }
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
