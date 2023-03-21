import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { AuthContext } from '../../../contexts/auth';
import { UiContext } from '../../../contexts/ui';
import { PasswordForm, EmailForm, DescriptionForm, WebsiteForm } from '../';

import './settingsForm.scss';

interface Props {
	refetchUser: () => void;
}

export const SettingsForm = ( { refetchUser }: Props ) => {

	const { onCloseModal, onSetModalChildren, onSetModalTitle } = useContext( UiContext );
	const { logOut } = useContext( AuthContext );

	const navigate = useNavigate();
	const client = useApolloClient();

	const onChangePassword = () => {
		onSetModalTitle( "Cambiar contraseña." );
		onSetModalChildren( <PasswordForm /> );
	};

	const onChangeEmail = () => {
		onSetModalTitle( "Cambiar correo electrónico." );
		onSetModalChildren( <EmailForm /> );
	};

	const onChangeDescription = () => {
		onSetModalTitle( "Actualizar biografía." );
		onSetModalChildren( <DescriptionForm refetchUser={ refetchUser } /> );
	};

	const onChangeWebsite = () => {
		onSetModalTitle( "Actualizar sitio web." );
		onSetModalChildren( <WebsiteForm refetchUser={ refetchUser } /> );
	};

	const handleLogOut = async () => {
		logOut();
		client.clearStore();
		onCloseModal();
		navigate( '/auth/login' );
	};

	return (
		<div className="settings-form">
			<Button onClick={ onChangePassword }>Cambiar contraseña</Button>
			<Button onClick={ onChangeEmail }>Cambiar correo electrónico</Button>
			<Button onClick={ onChangeDescription }>Descripción</Button>
			<Button onClick={ onChangeWebsite }>Sitio web</Button>
			<Button onClick={ handleLogOut }>Cerrar sesión</Button>
			<Button onClick={ onCloseModal }>Cancelar</Button>
		</div>
	);
};
