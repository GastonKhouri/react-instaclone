import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import client from './config/apollo';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './contexts/auth';
import { UiProvider } from './contexts/ui';

import 'react-toastify/dist/ReactToastify.min.css';

export const InstacloneApp = () => {
	return (
		<ApolloProvider client={ client }>
			<AuthProvider>
				<UiProvider>
					<AppRouter />
					<ToastContainer
						position="top-right"
						autoClose={ 5000 }
						newestOnTop
						closeOnClick
						rtl={ false }
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</UiProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};
