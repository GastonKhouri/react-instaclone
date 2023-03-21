import { Button } from 'semantic-ui-react';

import { useUpdateAvatar } from '../../../hooks';

import './avatarForm.scss';

export const AvatarForm = () => {

	const {
		getInputProps,
		getRootProps,
		uploadingAvatar,
		onCloseModal,
		onDeleteAvatar
	} = useUpdateAvatar();

	return (
		<div className="avatar-form">
			<Button { ...getRootProps( {} ) } loading={ uploadingAvatar } >Cargar una foto</Button>
			<Button onClick={ onDeleteAvatar } >Eliminar foto actual</Button>
			<Button onClick={ onCloseModal }>Cancelar</Button>
			<input { ...getInputProps() } />
		</div>
	);
};
