import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, UserPage } from '../pages';

export const InstacloneRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={ <HomePage /> } />
			<Route path="/:username" element={ <UserPage /> } />
			<Route path='/*' element={ <Navigate to="/" /> } />
		</Routes>
	);
};