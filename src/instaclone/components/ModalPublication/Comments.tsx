import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import { GET_COMMENTS } from '../../../gql/comment';
import { Comment, GetCommentsQuery, Publication } from '../../../interfaces';

import './modalPublication.scss';

interface Props {
	publication: Publication;
}

export const Comments = ( { publication }: Props ) => {

	const { data, loading, startPolling, stopPolling } = useQuery<GetCommentsQuery>( GET_COMMENTS, {
		variables: {
			publication: publication.id
		}
	} );

	useEffect( () => {
		startPolling( 1000 );

		return () => {
			stopPolling();
		};
	}, [] );

	if ( loading ) return <></>;

	const { getComments: comments } = data!;

	return (
		<div className="comments">
			{
				comments.map( comment => (
					<CommentItem key={ comment.id } comment={ comment } />
				) )
			}
		</div>
	);
};

interface CommentProps {
	comment: Comment;
}

const CommentItem = ( { comment }: CommentProps ) => {

	return (
		<Link to={ `/${ comment?.user?.username }` } className="comment">
			<Image src={ comment?.user?.avatar || '/assets/png/avatar.png' } avatar />
			<div>
				<p>{ comment?.user?.username }</p>
				<p>{ comment?.text }</p>
			</div>
		</Link>
	);

};
