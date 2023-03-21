import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SEARCH_USERS } from '../gql/user';
import { SearchUsersQuery } from '../interfaces';


export const useSearchUsers = () => {

	const [ searchText, setSearchText ] = useState( '' );
	const [ users, setUsers ] = useState<any[]>( [] );

	const navigate = useNavigate();

	const [ searchUsersQuery, { loading } ] = useLazyQuery<SearchUsersQuery>( SEARCH_USERS );

	const handleSearchChange = async ( value: string = '' ) => {

		if ( !value || value.trim().length <= 0 ) {
			setSearchText( '' );
			setUsers( [] );
			return;
		};

		setSearchText( value );

		const { data } = await searchUsersQuery( {
			variables: {
				query: value
			}
		} );

		if ( !data ) {
			return setUsers( [] );
		};

		const result = data.searchUsers.map( ( user, idx ) => ( {
			key: idx,
			title: user.name,
			avatar: user.avatar,
			username: user.username,
		} ) );

		setUsers( result );

	};

	const handleResultSelect = ( { username }: any ) => {
		navigate( `/${ username }` );
		setSearchText( '' );
		setUsers( [] );
	};

	return {
		searchText,
		loading,
		users,
		handleSearchChange,
		handleResultSelect,
	};

};
