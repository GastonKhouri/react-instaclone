import { useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../../contexts/auth';
import { useSubmitForms } from '../../../hooks';

import './emailForm.scss';

const emailSchema = Yup.object( {
	email: Yup.string()
		.email( 'Correo inválido.' )
		.required( 'Campo obligatorio.' ),
} );

export const EmailForm = () => {

	const { onSubmitEmailForm } = useSubmitForms();

	const { user } = useContext( AuthContext );

	const { handleSubmit, values, handleChange, errors, isValid } = useFormik( {
		initialValues: {
			email: user?.email || '',
		},
		validationSchema: emailSchema,
		onSubmit: onSubmitEmailForm
	} );

	return (
		<Form className="email-form" onSubmit={ handleSubmit }>

			<Form.Input
				type="email"
				placeholder="Correo electrónico"
				name="email"
				value={ values.email }
				onChange={ handleChange }
				error={ errors.email && true }
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
