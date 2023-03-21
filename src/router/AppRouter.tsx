import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';
import { InstacloneLayout } from '../instaclone/layout';
import { AuthLayout } from '../auth/layout';
import { CheckingAuth } from '../ui/components';


export const AppRouter = () => {

	const { status } = useContext( AuthContext );

	if ( status === 'checking' ) {
		return <CheckingAuth />;
	}

	return (
		<Routes>

			{
				status === 'not-authenticated'
				&& <Route path="/auth/*" element={ <AuthLayout /> } />
			}

			<Route path="/*" element={ <InstacloneLayout /> } />

		</Routes>
	);
};