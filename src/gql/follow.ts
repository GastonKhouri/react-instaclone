import { gql } from '@apollo/client';

export const FOLLOW_USER = gql`
	mutation Follow($username: String!) {
		follow(username: $username)
	}
`;

export const UNFOLLOW_USER = gql`
	mutation Unfollow($username: String!) {
		unfollow(username: $username)
	}
`;

export const IS_FOLLOWING = gql`
	query IsFollowing($username: String!) {
		isFollowing(username: $username)
	}
`;

export const GET_FOLLOWERS = gql`
	query GetFollowers($username: String!) {
		getFollowers(username: $username) {
			name
			username
			avatar
		}
	}
`;

export const GET_FOLLOWING = gql`
	query GetFollowing($username: String!) {
		getFollowing(username: $username) {
			name
			username
			avatar
		}
	}
`;

export const GET_NOT_FOLLOWING = gql`
	query GetNotFollowing {
		getNotFollowing {
			id
			name
			username
		}
	}
`;