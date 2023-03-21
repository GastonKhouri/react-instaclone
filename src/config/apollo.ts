import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const httpLink = createUploadLink( {
	uri: VITE_API_URL,
} );

const authLink = setContext( ( _, { headers } ) => {
	const token = localStorage.getItem( 'token' ) || '';
	return {
		headers: {
			...headers,
			'x-token': token ? token : '',
		}
	};
} );

const client = new ApolloClient( {
	connectToDevTools: true,
	link: authLink.concat( httpLink ),
	cache: new InMemoryCache( {
		addTypename: false,
	} ),
} );

export default client;