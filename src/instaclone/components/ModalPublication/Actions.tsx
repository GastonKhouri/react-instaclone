import { Icon } from 'semantic-ui-react';

import { usePublicationActions } from '../../../hooks';
import { Publication } from '../../../interfaces';

import './modalPublication.scss';

interface Props {
	publication: Publication;
}

export const Actions = ( { publication }: Props ) => {

	const {
		getLikesLoading,
		isLikedLoading,
		getLikesData,
		isLikedData,
		onDeleteLike,
		onAddLike,
		isLoadingAction
	} = usePublicationActions( publication.id );

	if ( getLikesLoading || isLikedLoading ) return <></>;

	const { getLikes: { count } } = getLikesData!;
	const { isLiked = false } = isLikedData!;

	const handleLike = () => {

		if ( !isLoadingAction ) {
			isLiked ? onDeleteLike() : onAddLike();
		}

	};

	return (
		<div className="actions">
			<Icon
				onClick={ handleLike }
				name={ isLiked ? "heart" : "heart outline" }
				className={ `like ${ isLiked ? 'active' : '' }` }
			/>
			{ count } { count === 1 ? 'Like' : 'Likes' }
		</div>
	);
};
