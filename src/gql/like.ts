import { gql } from '@apollo/client';

export const POST_LIKE = gql`
	mutation PostLike($publication: ID!) {
		postLike(publication: $publication)
	}
`;

export const DELETE_LIKE = gql`
	mutation DeleteLike($publication: ID!) {
		deleteLike(publication: $publication)
	}
`;

export const GET_LIKES = gql`
	query GetLikes($publication: ID!) {
		getLikes(publication: $publication) {
			count
		}
	}
`;

export const IS_LIKED = gql`
	query IsLiked($publication: ID!) {
		isLiked(publication: $publication)
	}
`;