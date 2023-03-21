import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import { User } from '../../../interfaces';
import { UiContext } from '../../../contexts/ui';

import './userList.scss';

interface Props {
	users: User[];
}

export const UserList = ( { users }: Props ) => {

	return (
		<div className="user-list">
			{
				users.length > 0
					? users.map( ( user ) => (
						<UserItem key={ user.username } user={ user } />
					) )
					: <div className="user-list__not-users">No se han encontrado usuarios.</div>
			}
		</div>
	);
};

const UserItem = ( { user }: { user: User; } ) => {

	const { onCloseModal } = useContext( UiContext );
	const navigate = useNavigate();

	const handleClick = () => {
		onCloseModal();
		navigate( `/${ user.username }` );
	};

	return (
		<div onClick={ handleClick } className="user-list__user">
			<Image src={ user?.avatar || '/assets/png/avatar.png' } avatar />
			<div>
				<p>{ user.name }</p>
				<p>{ user.username }</p>
			</div>
		</div>
	);

};
