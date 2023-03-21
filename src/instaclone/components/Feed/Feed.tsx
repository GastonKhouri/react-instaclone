import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import { GET_PUBLICATIONS_FOLLOWED } from '../../../gql/publication';
import { GetPublicationsFollowedQuery, Publication } from '../../../interfaces';
import { ModalPublication } from '../ModalPublication';

import { Actions } from '../ModalPublication/Actions';
import { CommentForm } from '../ModalPublication/CommentForm';

import './feed.scss';

export const Feed = () => {

	const [ showModal, setShowModal ] = useState( false );
	const [ publication, setPublication ] = useState<Publication>();

	const {
		data,
		loading,
		startPolling,
		stopPolling
	} = useQuery<GetPublicationsFollowedQuery>( GET_PUBLICATIONS_FOLLOWED );

	useEffect( () => {
		startPolling( 1000 * 60 );

		return () => {
			stopPolling();
		};
	}, [] );

	if ( loading ) return <></>;

	const { getPublicationsFollowed: publicationsFollowed } = data!;

	return (
		<>
			<div className="feed">
				{
					publicationsFollowed.map( publication => (
						<PublicationFeed
							key={ publication.id }
							publication={ publication }
							setShowModal={ setShowModal }
							setPublication={ setPublication }
						/>
					) )
				}
			</div>
			{
				showModal && publication && (
					<ModalPublication
						show={ showModal }
						setShow={ setShowModal }
						publication={ publication }
					/>
				)
			}
		</>
	);
};

interface PropsPublication {
	publication: Publication;
	setShowModal: ( show: boolean ) => void;
	setPublication: ( publication: Publication ) => void;
}

const PublicationFeed = ( { publication, setShowModal, setPublication }: PropsPublication ) => {

	const handleOpenModal = ( publication: Publication ) => {
		setPublication( publication );
		setShowModal( true );
	};

	return (
		<div className="feed__box">
			<Link to={ `/${ publication.user?.username }` }>
				<div className="feed__box-user">
					<Image
						src={ publication.user?.avatar || '/assets/png/avatar.png' }
						avatar
					/>
					<span>{ publication.user?.username }</span>
				</div>
			</Link>
			<div
				className="feed__box-photo"
				style={ {
					backgroundImage: `url(${ publication.file })`
				} }
				onClick={ () => handleOpenModal( publication ) }
			/>
			<div className="feed__box-actions">
				<Actions publication={ publication } />
			</div>
			<div className="feed__box-form">
				<CommentForm publication={ publication } />
			</div>
		</div>
	);

};