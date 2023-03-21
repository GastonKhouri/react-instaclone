import { gql } from '@apollo/client';

export const REGISTER = gql`
	mutation Register($input: RegisterUserInput) {
		register(input: $input) {
			token
			user {
				id
				name
				username
				email
				avatar
				createdAt
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginUserInput) {
	login(input: $input) {
			token
			user {
				id
				name
				username
				email
				avatar
				createdAt
			}
		}
	}
`;

export const RENEW = gql`
	query Renew {
		renew {
			token
			user {
				id
				name
				username
				email
				avatar
				website
				description
			}
		}
	}
`;

export const GET_USER = gql`
	query GetUser($id: ID, $username: String) {
		getUser(id: $id, username: $username) {
			id
			name
			email
			avatar
			website
			description
			username
		}
	}
`;

export const UPDATE_AVATAR = gql`
    mutation UpdateAvatar($file: Upload){
        updateAvatar(file: $file) {
            status
            avatarUrl
        }
    }
`;

export const DELETE_AVATAR = gql`
	mutation DeleteAvatar {
		deleteAvatar
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($input: UpdateUserInput) {
		updateUser(input: $input)
	}
`;

export const SEARCH_USERS = gql`
	query SearchUsers($query: String) {
		searchUsers(query: $query) {
			name
			username
			avatar
		}
	}
`;