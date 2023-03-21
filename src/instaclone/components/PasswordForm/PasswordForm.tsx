import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useSubmitForms } from '../../../hooks';

import './passwordForm.scss';

const passwordInitialValues = {
	oldPassword: '',
	newPassword: '',
	newPassword2: '',
};

const passwordSchema = Yup.object( {
	oldPassword: Yup.string()
		.required( 'Campo obligatorio.' ),
	newPassword: Yup.string()
		.min( 6, 'La contraseña debe tener por lo menos 6 caracteres.' )
		.required( 'Campo obligatorio.' ),
	newPassword2: Yup.string()
		.oneOf( [ Yup.ref( 'newPassword' ), null ], "Las contraseñas no coinciden." )
		.required( 'Campo obligatorio.' ),
} );

export const PasswordForm = () => {

	const { onSubmitPasswordForm } = useSubmitForms();

	const { handleSubmit, values, handleChange, errors, isValid } = useFormik( {
		initialValues: passwordInitialValues,
		validationSchema: passwordSchema,
		onSubmit: onSubmitPasswordForm
	} );

	return (
		<Form className="password-form" onSubmit={ handleSubmit }>

			<Form.Input
				type="password"
				placeholder="Contraseña actual"
				name="oldPassword"
				value={ values.oldPassword }
				onChange={ handleChange }
				error={ errors.oldPassword && true }
			/>

			<Form.Input
				type="password"
				placeholder="Nueva contraseña"
				name="newPassword"
				value={ values.newPassword }
				onChange={ handleChange }
				error={ errors.newPassword && true }
			/>

			<Form.Input
				type="password"
				placeholder="Repetir nueva contraseña"
				name="newPassword2"
				value={ values.newPassword2 }
				onChange={ handleChange }
				error={ errors.newPassword2 && true }
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
