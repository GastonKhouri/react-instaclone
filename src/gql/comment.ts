import { gql } from '@apollo/client';

export const POST_COMMENT = gql`
	mutation PostComment($input: CommentInput) {
		postComment(input: $input) {
			text
			publication
		}
	}
`;

export const GET_COMMENTS = gql`
	query GetComments($publication: ID!) {
		getComments(publication: $publication) {
			id
			text
			user {
				username
				avatar
			}
		}
	}
`;