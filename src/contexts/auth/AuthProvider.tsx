import { useMutation, useLazyQuery } from '@apollo/client';
import { FC, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

import { User, LoginData, RegisterData, LoginMutation, RegisterMutation, RenewQuery, UpdateUserMutation, ChangePassword } from '../../interfaces';
import { LOGIN, REGISTER, RENEW, UPDATE_USER } from '../../gql/user';
import { AuthContext, authReducer } from './';

export interface AuthState {
	user: User | null;
	status: 'checking' | 'authenticated' | 'not-authenticated';
}

const AUTH_INITIAL_STATE: AuthState = {
	user: null,
	status: 'checking'
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<Props> = ( { children } ) => {

	const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );
	const [ login ] = useMutation<LoginMutation>( LOGIN );
	const [ register ] = useMutation<RegisterMutation>( REGISTER );
	const [ renew ] = useLazyQuery<RenewQuery>( RENEW );
	const [ updateUser ] = useMutation<UpdateUserMutation>( UPDATE_USER );

	useEffect( () => {

		checkToken();

	}, [] );

	const checkToken = async () => {

		const token = localStorage.getItem( 'token' );

		// Si no hay token
		if ( !token ) {
			return logOut();
		}

		// Si hay token
		try {

			const { data } = await renew();

			if ( !data ) {
				return logOut();
			}

			const { renew: { token: newToken, user } } = data;

			dispatch( {
				type: '[Auth] SignIn - SignUp',
				payload: user
			} );

			localStorage.setItem( 'token', newToken );

		} catch ( error ) {

			return logOut();

		}

	};

	const signUp = async ( { name, email, password, username }: RegisterData ) => {

		try {

			const { data } = await register( {
				variables: {
					input: { name, email, password, username }
				}
			} );

			if ( !data ) {
				return logOut();
			}

			const { register: { token, user } } = data;

			dispatch( {
				type: '[Auth] SignIn - SignUp',
				payload: user
			} );

			localStorage.setItem( 'token', token );
			localStorage.setItem( 'token-init-date', new Date().getTime().toString() );


		} catch ( error: any ) {

			toast.error( error.message );
			logOut();

		}

	};

	const signIn = async ( { email, password }: LoginData ) => {

		try {

			const { data } = await login( {
				variables: {
					input: { email, password }
				}
			} );

			if ( !data ) {
				return logOut();
			}

			const { login: { token, user } } = data;

			dispatch( {
				type: '[Auth] SignIn - SignUp',
				payload: user
			} );

			localStorage.setItem( 'token', token );
			localStorage.setItem( 'token-init-date', new Date().getTime().toString() );

		} catch ( error: any ) {

			toast.error( error.message );
			logOut();

		}

	};

	const logOut = async () => {

		dispatch( { type: '[Auth] Logout' } );
		localStorage.clear();

	};

	const updateUserSync = ( user: User ) => {

		dispatch( {
			type: '[Auth] Update User',
			payload: user
		} );

	};

	const updateUserAsync = async ( user: User | ChangePassword ) => {

		try {

			const { data } = await updateUser( {
				variables: {
					input: { ...user }
				}
			} );

			if ( !data ) return { ok: false };
			if ( !data.updateUser ) return { ok: false };

			return { ok: true };

		} catch ( error: any ) {

			return { ok: false, errorMessage: error.message };

		}

	};

	return (
		<AuthContext.Provider value={ {
			...state,
			signUp,
			signIn,
			logOut,
			updateUserSync,
			updateUserAsync,
		} }>
			{ children }
		</AuthContext.Provider>
	);
};