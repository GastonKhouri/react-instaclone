import { Link } from 'react-router-dom';

import './userNotFoundPage.scss';

export const UserNotFoundPage = () => {
	return (
		<div className="user-not-found">
			<p>Esta página no está disponible.</p>
			<p>
				Es posible que el enlace que seleccionaste no funcione o que
				se haya eliminado la página.
				<Link to="/"> Volver a Instaclone.</Link>
			</p>
		</div>
	);
};
