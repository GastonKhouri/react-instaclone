import { UserState } from './';
import { User } from '../../interfaces/user';

type UserAction =
	| { type: '[User] Set Active User', payload: User | null; };

export const userReducer = ( state: UserState, action: UserAction ): UserState => {

	switch ( action.type ) {
		case '[User] Set Active User':
			return {
				...state,
				activeUser: action.payload,
			};

		default:
			return state;
	}

};