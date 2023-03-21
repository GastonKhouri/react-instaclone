import { useContext } from 'react';
import { Modal } from 'semantic-ui-react';

import { UiContext } from '../../../contexts/ui';

import './modalBasic.scss';

export const ModalBasic = () => {

	const { onCloseModal, showModal, modalChildren, modalTitle } = useContext( UiContext );

	return (
		<Modal size="mini" open={ showModal } onClose={ onCloseModal } className="modal-basic animate__animated animate__fadeIn">
			{
				modalTitle && (
					<Modal.Header>
						{ modalTitle }
					</Modal.Header>
				)
			}

			{ modalChildren }
		</Modal>
	);
};
