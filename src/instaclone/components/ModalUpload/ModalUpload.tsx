import { useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Icon, Modal, Button, Dimmer, Loader } from 'semantic-ui-react';

import { POST_PUBLICATION } from '../../../gql/publication';
import { FileToUpload } from '../../../interfaces';

import './modalUpload.scss';

interface Props {
	show: boolean;
	setShow: ( show: boolean ) => void;
}

export const ModalUpload = ( { setShow, show }: Props ) => {

	const [ fileToUpload, setFileToUpload ] = useState<FileToUpload>();
	const [ postPublication, { loading } ] = useMutation( POST_PUBLICATION );

	const onDrop = useCallback(

		async ( acceptedFiles: File[] ) => {

			const file = acceptedFiles[ 0 ];

			setFileToUpload( {
				type: 'image',
				preview: URL.createObjectURL( file ),
				file,
			} );

		},
		[],
	);

	const { getRootProps, getInputProps } = useDropzone( {
		accept: {
			'image/png': [ '.png' ],
			'image/jpeg': [ '.jpeg' ],
			'image/jpg': [ '.jpg' ],
		},
		multiple: false,
		noKeyboard: true,
		onDrop
	} );

	const handleClose = () => {
		setShow( false );
		setFileToUpload( undefined );
	};

	const onPublish = async () => {

		try {

			const { data } = await postPublication( {
				variables: { file: fileToUpload?.file }
			} );

			if ( !data ) return;

			const { postPublication: { status } } = data;

			if ( !status ) {
				toast.error( 'Error al subir la publicación.' );
				return;
			}

			handleClose();

		} catch ( error ) {
			console.log( error );
		}

	};

	return (
		<Modal
			size='small'
			open={ show }
			onClose={ handleClose }
			className="modal-upload animate__animated animate__fadeIn"
		>
			<div { ...getRootProps() } className="dropzone" style={ fileToUpload && { border: 0 } }>
				{
					!fileToUpload && (
						<>
							<Icon name="cloud upload" />
							<p>Arrastra la foto que quieres publicar.</p>
						</>
					)
				}
				<input { ...getInputProps() } />
			</div>
			{
				fileToUpload?.type === 'image' && (
					<div
						className="image"
						style={ { backgroundImage: `url("${ fileToUpload.preview }")` } }
					/>
				)
			}

			{
				fileToUpload && (
					<Button className="btn-upload btn-action" onClick={ onPublish }>
						Publicar
					</Button>
				)
			}

			{
				loading && (
					<Dimmer active className="publishing">
						<Loader />
						<p>Publicando...</p>
					</Dimmer>
				)
			}
		</Modal>
	);
};
