import { Grid, Modal } from 'semantic-ui-react';

import { Publication } from '../../../interfaces';
import { Actions } from './Actions';
import { CommentForm } from './CommentForm';
import { Comments } from './Comments';

import './modalPublication.scss';

interface Props {
	show: boolean;
	setShow: ( show: boolean ) => void;
	publication: Publication;
}

export const ModalPublication = ( { setShow, show, publication }: Props ) => {

	const handleClose = () => {
		setShow( false );
	};

	return (
		<Modal
			open={ show }
			onClose={ handleClose }
			className="modal-publication animate__animated animate__fadeIn"
		>
			<Grid>
				<Grid.Column
					className="modal-publication__left"
					width={ 10 }
					style={ { backgroundImage: `url("${ publication.file }")` } }
				/>
				<Grid.Column className="modal-publication__right" width={ 6 }>
					<Comments publication={ publication } />
					<Actions publication={ publication } />
					<CommentForm publication={ publication } />
				</Grid.Column>
			</Grid>
		</Modal>
	);
};
