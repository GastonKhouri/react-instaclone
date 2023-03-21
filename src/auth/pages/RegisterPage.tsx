import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../contexts/auth';

const registerInitialValues = {
	email: '',
	name: '',
	username: '',
	password: '',
	password2: '',
};

const registerSchema = Yup.object( {
	email: Yup.string()
		.email( 'Correo inválido.' )
		.required( 'Campo obligatorio.' ),
	name: Yup.string()
		.required( 'Campo obligatorio.' ),
	username: Yup.string()
		.matches( /^[A-Za-z][A-Za-z0-9_]{7,29}$/, "Nombre de usuario no válido." )
		.required( 'Campo obligatorio.' ),
	password: Yup.string()
		.min( 6, 'La contraseña debe tener por lo menos 6 caracteres.' )
		.required( 'Campo obligatorio.' ),
	password2: Yup.string()
		.oneOf( [ Yup.ref( 'password' ), null ], "Las contraseñas no coinciden." )
		.required( 'Campo obligatorio.' ),
} );

export const RegisterPage = () => {

	const { signUp } = useContext( AuthContext );

	const { handleSubmit, values, handleChange, errors, isValid } = useFormik( {
		initialValues: registerInitialValues,
		validationSchema: registerSchema,
		onSubmit: async ( values ) => {

			const { password2, ...rest } = values;
			await signUp( rest );

		}
	} );

	return (
		<>
			<div className="container-form">
				<Image className="logo" src='/assets/png/instaclone.png' />
				<h2 className="form-title">
					Regístrate para ver fotos y videos de tus amigos.
				</h2>
				<Form onSubmit={ handleSubmit } className="form" noValidate>
					<Form.Input
						type="email"
						placeholder="Correo electrónico"
						name="email"
						value={ values.email }
						onChange={ handleChange }
						error={ errors.email && true }
					/>
					<Form.Input
						type="text"
						placeholder="Nombre completo"
						name="name"
						value={ values.name }
						onChange={ handleChange }
						error={ errors.name && true }
					/>
					<Form.Input
						type="text"
						placeholder="Nombre de usuario"
						name="username"
						value={ values.username }
						onChange={ handleChange }
						error={ errors.username && true }
					/>
					<Form.Input
						type="password"
						placeholder="Contraseña"
						name="password"
						value={ values.password }
						onChange={ handleChange }
						error={ errors.password && true }
					/>
					<Form.Input
						type="password"
						placeholder="Repetir contraseña"
						name="password2"
						value={ values.password2 }
						onChange={ handleChange }
						error={ errors.password2 && true }
					/>
					<Button
						type="submit"
						className='btn-submit'
						disabled={ !isValid }
					>
						Registrarte
					</Button>
				</Form>
			</div>

			<div className="change-form">
				<p>
					¿Tienes una cuenta?
					<Link to='/auth/login'>
						<span>Inicia sesión</span>
					</Link>
				</p>
			</div>
		</>
	);
};
