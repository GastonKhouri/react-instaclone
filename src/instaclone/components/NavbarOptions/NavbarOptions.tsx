import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';

import { AuthContext } from '../../../contexts/auth';
import { ModalUpload } from '../ModalUpload';

import './navbarOptions.scss';

export const NavbarOptions = () => {

	const { user } = useContext( AuthContext );

	const [ show, setShow ] = useState( false );

	const handleOpen = () => setShow( true );

	return (
		<>
			<div className="right-header">
				<Link to="/">
					<Icon name="home" />
				</Link>
				<Icon onClick={ handleOpen } name="plus" />
				<Link to={ `/${ user?.username }` }>
					<Image src={ user?.avatar || '/assets/png/avatar.png' } avatar alt="avatar" />
				</Link>
			</div>
			<ModalUpload show={ show } setShow={ setShow } />
		</>
	);
};
