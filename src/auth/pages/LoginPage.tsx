import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../contexts/auth';

const loginInitialValues = {
	email: '',
	password: '',
};

const loginSchema = Yup.object( {
	email: Yup.string()
		.email( 'Correo inválido.' )
		.required( 'Campo obligatorio.' ),
	password: Yup.string()
		.required( 'Campo obligatorio.' ),
} );

export const LoginPage = () => {

	const { signIn } = useContext( AuthContext );

	const { handleSubmit, values, handleChange, errors, isValid } = useFormik( {
		initialValues: loginInitialValues,
		validationSchema: loginSchema,
		onSubmit: async ( values ) => {
			await signIn( values );
		}
	} );

	return (
		<>
			<div className="container-form">
				<Image className="logo" src='/assets/png/instaclone.png' />
				<h2 className="form-title">
					Inicia sesión para ver fotos y videos de tus amigos.
				</h2>
				<Form onSubmit={ handleSubmit } className="form" noValidate>
					<Form.Input
						type="text"
						placeholder="Correo electrónico"
						name="email"
						value={ values.email }
						onChange={ handleChange }
						error={ errors.email && true }
					/>
					<Form.Input
						type="password"
						placeholder="Contraseña"
						name="password"
						value={ values.password }
						onChange={ handleChange }
						error={ errors.password && true }
					/>
					<Button
						type="submit"
						className='btn-submit'
						disabled={ !isValid }
					>
						Iniciar sesión
					</Button>
				</Form>
			</div>

			<div className="change-form">
				<p>
					¿No tienes cuenta?
					<Link to='/auth/register'>
						<span>Regístrate</span>
					</Link>
				</p>
			</div>
		</>
	);
};
