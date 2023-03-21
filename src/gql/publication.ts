import { gql } from '@apollo/client';

export const POST_PUBLICATION = gql`
	mutation PostPublication($file: Upload) {
		postPublication(file: $file) {
			status
			fileUrl
		}
	}
`;

export const GET_PUBLICATIONS = gql`
	query GetPublications($username: String!) {
		getPublications(username: $username) {
			file
			id
			fileType
			createdAt
		}
	}
`;

export const GET_PUBLICATIONS_FOLLOWED = gql`
	query GetPublicationsFollowed {
		getPublicationsFollowed {
			id
			user {
				name
				username
				avatar
			}
			file
			fileType
			createdAt
		}
	}
`;