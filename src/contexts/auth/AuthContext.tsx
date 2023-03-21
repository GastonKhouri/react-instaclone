import { createContext } from 'react';

import { LoginData, User, RegisterData, ChangePassword } from '../../interfaces';

interface UpdateUserAsync {
	ok: boolean,
	errorMessage?: string,
}

interface ContextProps {
	user: User | null;
	status: 'checking' | 'authenticated' | 'not-authenticated';
	signUp: ( registerData: RegisterData ) => Promise<void>;
	signIn: ( loginData: LoginData ) => Promise<void>;
	logOut: () => void;
	updateUserSync: ( user: User ) => void;
	updateUserAsync: ( user: User | ChangePassword ) => Promise<UpdateUserAsync>;
}

export const AuthContext = createContext( {} as ContextProps );