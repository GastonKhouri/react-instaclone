import { FC, useEffect, useState, useReducer } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { UserContext, userReducer } from '.';
import { GetUserQuery, User } from '../../interfaces';
import { GET_USER, UPDATE_AVATAR } from '../../gql/user';

export interface UserState {
	// users: User[];
	activeUser: User | null;
}

const USER_INITIAL_STATE: UserState = {
	// users: [],
	activeUser: null
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const UserProvider: FC<Props> = ( { children } ) => {

	const [ state, dispatch ] = useReducer( userReducer, USER_INITIAL_STATE );

	const [ getUser, { loading, error, refetch } ] = useLazyQuery<GetUserQuery>( GET_USER );

	// useEffect( () => {
	// 	loadUsers();
	// }, [] );

	const loadUsers = async () => {

		// const { data } = await cafeApi.get<UsersResponse>( '/productos?limite=40' );

		// setUsers( [ ...data.productos ] );

	};

	const loadUserByUsername = async ( username: string ): Promise<void> => {

		const { data } = await getUser( {
			variables: { username }
		} );

		if ( !data ) {
			dispatch( {
				type: '[User] Set Active User',
				payload: null
			} );
			return;
		};

		dispatch( {
			type: '[User] Set Active User',
			payload: data.getUser
		} );

	};

	return (
		<UserContext.Provider value={ {
			...state,
			loadUserByUsername,
			isLoadingUser: loading,
			errorUser: error,
		} }>
			{ children }
		</UserContext.Provider>
	);
};