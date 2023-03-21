import { AuthState } from './';
import { User } from '../../interfaces';

type AuthAction =
	| { type: '[Auth] SignIn - SignUp'; payload: User; }
	| { type: '[Auth] Logout'; }
	| { type: '[Auth] Checking Credentials'; }
	| { type: '[Auth] Update User', payload: User; };

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

	switch ( action.type ) {
		case '[Auth] SignIn - SignUp':
			return {
				...state,
				status: 'authenticated',
				user: action.payload,
			};

		case '[Auth] Checking Credentials':
			return {
				...state,
				status: 'checking'
			};

		case '[Auth] Update User':
			return {
				...state,
				user: {
					...state.user,
					...action.payload
				}
			};

		case '[Auth] Logout':
			return {
				...state,
				status: 'not-authenticated',
				user: null
			};

		default:
			return state;
	}

};