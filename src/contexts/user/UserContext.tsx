import { ApolloError } from '@apollo/client';
import { createContext } from 'react';

import { User } from '../../interfaces';

interface ContextProps {
	// users: User[];
	activeUser: User | null;
	isLoadingUser: boolean;
	errorUser: ApolloError | undefined;
	// loadUsers: () => Promise<void>;
	loadUserByUsername: ( id: string ) => Promise<void>;
}

export const UserContext = createContext( {} as ContextProps );