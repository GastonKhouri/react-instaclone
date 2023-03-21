import { useState } from 'react';
import { Image } from 'semantic-ui-react';

import { Publication } from '../../../interfaces';
import { ModalPublication } from '../ModalPublication';

interface Props {
	publication: Publication;
}

export const PreviewPublication = ( { publication }: Props ) => {

	const [ show, setShow ] = useState( false );

	const handleOpen = () => {
		setShow( true );
	};

	return (
		<>
			<div className="preview-publication" onClick={ handleOpen }>
				<Image
					className="preview-publication__image"
					src={ publication.file }
				/>
			</div>

			<ModalPublication
				show={ show }
				setShow={ setShow }
				publication={ publication }
			/>
		</>
	);
};
